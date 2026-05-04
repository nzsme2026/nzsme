import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  // ✅ VERIFY SIGNATURE
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionId = session.id;
      const paymentIntent = session.payment_intent as string;

      console.log("✅ Payment success:", sessionId);

      // =========================================================
      // 🔍 TRY EVENT REGISTRATION FIRST
      // =========================================================
      const { data: eventRecord } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (eventRecord) {
        console.log("📌 Matched event registration");

        if (eventRecord.payment_status !== "paid") {
          await supabase
            .from("event_registrations")
            .update({
              payment_status: "paid",
              stripe_payment_intent: paymentIntent,
            })
            .eq("stripe_session_id", sessionId);
        }

        // 📧 EMAIL
        if (eventRecord.email) {
          resend.emails
            .send({
              from: "NZSME <noreply@nzsme.org>",
              to: [eventRecord.email],
              subject: "NZSME Event Registration Confirmed",
              html: `
                <h2>Registration Confirmed</h2>
                <p>Hi ${eventRecord.name || "Participant"},</p>

                <p>Your registration has been successfully confirmed.</p>

                <hr/>

                <p><strong>Event:</strong> ${eventRecord.event_name}</p>
                <p><strong>City:</strong> ${eventRecord.city || "N/A"}</p>
                <p><strong>Amount Paid:</strong> $${eventRecord.amount}</p>

                <hr/>

                <p>We look forward to seeing you.</p>

                <p>Regards,<br/>NZSME Team</p>
              `,
            })
            .catch((err) => console.error("❌ EMAIL ERROR:", err));
        }

        return NextResponse.json({ received: true });
      }

      // =========================================================
      // 🔍 FALLBACK → SPONSORSHIP
      // =========================================================
      const { data: sponsorRecord } = await supabase
        .from("sponsorship_contributions")
        .select("*")
        .eq("stripe_session_id", sessionId)
        .maybeSingle();

      if (sponsorRecord) {
        console.log("📌 Matched sponsorship contribution");

        if (sponsorRecord.payment_status !== "paid") {
          await supabase
            .from("sponsorship_contributions")
            .update({
              payment_status: "paid",
              stripe_payment_intent: paymentIntent,
            })
            .eq("stripe_session_id", sessionId);
        }

        // 📧 EMAIL
        if (sponsorRecord.email) {
          resend.emails
            .send({
              from: "NZSME <noreply@nzsme.org>",
              to: [sponsorRecord.email],
              subject: "NZSME Sponsorship Confirmed",
              html: `
                <h2>Thank You for Your Support</h2>

                <p>Hi ${sponsorRecord.name || "Sponsor"},</p>

                <p>Your sponsorship contribution has been successfully received.</p>

                <hr/>

                <p><strong>Amount:</strong> $${sponsorRecord.amount}</p>
                <p><strong>Organisation:</strong> ${
                  sponsorRecord.organisation || "N/A"
                }</p>

                <hr/>

                <p>We truly appreciate your support in building NZSME.</p>

                <p>Regards,<br/>NZSME Team</p>
              `,
            })
            .catch((err) => console.error("❌ EMAIL ERROR:", err));
        }

        return NextResponse.json({ received: true });
      }

      // =========================================================
      // ❌ NOTHING MATCHED
      // =========================================================
      console.error("❌ No matching record found for session:", sessionId);
    }

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);

    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}