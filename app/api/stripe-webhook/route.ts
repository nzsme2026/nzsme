import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const runtime = "nodejs"; // ✅ REQUIRED for Stripe webhooks

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  // ✅ ENV CHECK
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("❌ Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Server config error", { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("❌ Missing Stripe signature");
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  // ✅ VERIFY SIGNATURE
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("❌ Signature verification failed:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  console.log("📦 Stripe event:", event.id, event.type);

  // ✅ Only process successful checkout
  if (event.type !== "checkout.session.completed") {
    return new Response("Ignored", { status: 200 });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;

    const sessionId = session.id;

    const paymentIntent =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || null;

    console.log("✅ Processing session:", sessionId);

    // =========================================================
    // 🔍 EVENT REGISTRATION
    // =========================================================
    const { data: eventRecord, error: eventFetchError } = await supabase
      .from("event_registrations")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (eventFetchError) {
      console.error("❌ DB fetch error (event):", eventFetchError);
    }

    if (eventRecord) {
      console.log("📌 Matched event registration");

      // ✅ IDEMPOTENCY CHECK
      if (eventRecord.payment_status === "paid") {
        console.log("⚠️ Already processed event payment");
        return new Response("Already processed", { status: 200 });
      }

      const { error: updateError } = await supabase
        .from("event_registrations")
        .update({
          payment_status: "paid",
          stripe_payment_intent: paymentIntent,
        })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        console.error("❌ DB update error:", updateError);
        return new Response("DB update failed", { status: 500 });
      }

      // 📧 EMAIL (safe execution)
      if (eventRecord.email) {
        try {
          await resend.emails.send({
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
          });
        } catch (err) {
          console.error("❌ Email failed:", err);
        }
      }

      return new Response("OK", { status: 200 });
    }

    // =========================================================
    // 🔍 SPONSORSHIP
    // =========================================================
    const { data: sponsorRecord, error: sponsorFetchError } = await supabase
      .from("sponsorship_contributions")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (sponsorFetchError) {
      console.error("❌ DB fetch error (sponsor):", sponsorFetchError);
    }

    if (sponsorRecord) {
      console.log("📌 Matched sponsorship");

      // ✅ IDEMPOTENCY CHECK
      if (sponsorRecord.payment_status === "paid") {
        console.log("⚠️ Already processed sponsorship payment");
        return new Response("Already processed", { status: 200 });
      }

      const { error: updateError } = await supabase
        .from("sponsorship_contributions")
        .update({
          payment_status: "paid",
          stripe_payment_intent: paymentIntent,
        })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        console.error("❌ DB update error:", updateError);
        return new Response("DB update failed", { status: 500 });
      }

      // 📧 EMAIL (safe execution)
      if (sponsorRecord.email) {
        try {
          await resend.emails.send({
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

              <p>We truly appreciate your support.</p>

              <p>Regards,<br/>NZSME Team</p>
            `,
          });
        } catch (err) {
          console.error("❌ Email failed:", err);
        }
      }

      return new Response("OK", { status: 200 });
    }

    // =========================================================
    // ❌ NO MATCH FOUND
    // =========================================================
    console.error("❌ No matching record for session:", sessionId);
    return new Response("No record", { status: 200 });

  } catch (err) {
    console.error("❌ WEBHOOK CRASH:", err);
    return new Response("Webhook failed", { status: 500 });
  }
}