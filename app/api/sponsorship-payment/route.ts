import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// ✅ Safe Stripe init
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Supabase init
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// ✅ Robust base URL resolver
function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (envUrl && envUrl.startsWith("http")) {
    return envUrl.replace(/\/$/, "");
  }

  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      mobile,
      email,
      organisation,
      amount,
    } = body;

    const numericAmount = Number(amount);

    console.log("Incoming sponsorship:", {
      name,
      mobile,
      email,
      organisation,
      numericAmount,
    });

    // ✅ HARD VALIDATION
    if (!name || !mobile || !numericAmount) {
      return NextResponse.json(
        { error: "Name and mobile are required" },
        { status: 400 }
      );
    }

    if (isNaN(numericAmount) || numericAmount < 250) {
      return NextResponse.json(
        { error: "Minimum sponsorship amount is $250" },
        { status: 400 }
      );
    }

    if (numericAmount > 50000) {
      return NextResponse.json(
        { error: "Amount too large" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(req);
    console.log("Base URL:", baseUrl);

    // ✅ CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      customer_email: email || undefined,

      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: "NZSME Sponsorship Contribution",
            },
            unit_amount: Math.round(numericAmount * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        type: "sponsorship",
        name,
        mobile,
        email: email || "",
        organisation: organisation || "",
        amount: String(numericAmount),
      },

      success_url: `${baseUrl}/sponsorship-success`,
      cancel_url: `${baseUrl}/sponsorship`,
    });

    if (!session || !session.id || !session.url) {
      console.error("❌ Stripe session creation failed:", session);
      throw new Error("Stripe session not created properly");
    }

    // ✅ SAVE TO DB (CRITICAL)
    const { error: dbError } = await supabase
      .from("sponsorship_contributions")
      .insert([
        {
          name,
          mobile,
          email: email || null,
          organisation: organisation || null,
          amount: numericAmount,
          currency: "NZD",
          payment_status: "pending",
          stripe_session_id: session.id,
        },
      ]);

    if (dbError) {
      console.error("❌ DB ERROR:", dbError);
      throw new Error("Database insert failed");
    }

    console.log("✅ Sponsorship session created:", session.id);

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("❌ SPONSORSHIP ERROR:", err?.message || err);

    return NextResponse.json(
      { error: "Unable to initiate payment" },
      { status: 500 }
    );
  }
}