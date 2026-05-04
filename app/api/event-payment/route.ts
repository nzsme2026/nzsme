import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      city, // 🔥 NEW
      membershipId,
      type,
      amount,
      eventName,
    } = body;

    const finalEventName = eventName || "NZSME Workshop";

    // ✅ HARD VALIDATION
    if (!name || !email || !city || !type || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (type === "member" && !membershipId) {
      return NextResponse.json(
        { error: "Membership ID required for member access" },
        { status: 400 }
      );
    }

    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount < 5 || numericAmount > 1000) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // 🔥 CLEAN DATA (avoid garbage DB entries)
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCity =
      city.trim().charAt(0).toUpperCase() +
      city.trim().slice(1).toLowerCase();

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://nzsme.org";

    // ✅ CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: cleanEmail, // 🔥 IMPORTANT

      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: `${finalEventName} (${type})`,
            },
            unit_amount: Math.round(numericAmount * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        name: cleanName,
        email: cleanEmail,
        city: cleanCity, // 🔥 IMPORTANT (used in webhook/email later)
        membershipId: membershipId || "",
        type,
        eventName: finalEventName,
      },

      success_url: `${baseUrl}/event-success`,
      cancel_url: `${baseUrl}/events/register`,
    });

    if (!session || !session.id || !session.url) {
      console.error("❌ Stripe session creation failed:", session);
      throw new Error("Stripe session not created properly");
    }

    // ✅ SAVE TO DB
    const { error: dbError } = await supabase
      .from("event_registrations")
      .insert([
        {
          name: cleanName,
          email: cleanEmail,
          city: cleanCity, // 🔥 FIXED
          membership_id: membershipId || null,
          event_name: finalEventName,
          type,
          amount: numericAmount,
          payment_status: "pending",
          stripe_session_id: session.id,
        },
      ]);

    if (dbError) {
      console.error("❌ DB ERROR:", dbError);
      throw new Error("Database insert failed");
    }

    console.log("✅ Session created:", session.id);

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("❌ EVENT PAYMENT ERROR:", err);

    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}