import { NextResponse } from "next/server";
import Stripe from "stripe";

// ✅ Safe Stripe init
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Robust base URL resolver (no blind trust)
function getBaseUrl(req: Request) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

  // use env ONLY if it is clearly production
  if (envUrl && envUrl.startsWith("http")) {
    return envUrl.replace(/\/$/, "");
  }

  // fallback (works everywhere: local + Vercel)
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

    console.log("Incoming amount:", amount);

    // ✅ HARD VALIDATION
    if (!amount || isNaN(amount) || amount < 250) {
      return NextResponse.json(
        { error: "Minimum sponsorship amount is $250" },
        { status: 400 }
      );
    }

    // optional safety limit
    if (amount > 50000) {
      return NextResponse.json(
        { error: "Amount too large" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl(req);
    console.log("Base URL:", baseUrl);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: "NZSME Sponsorship Contribution",
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        type: "sponsorship",
        amount: String(amount),
      },

      success_url: `${baseUrl}/sponsorship-success`,
      cancel_url: `${baseUrl}/sponsorship`,
    });

    if (!session.url) {
      throw new Error("Stripe session URL not created");
    }

    console.log("Stripe session created:", session.id);

    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error("STRIPE ERROR:", err?.message || err);

    return NextResponse.json(
      { error: "Unable to initiate payment" },
      { status: 500 }
    );
  }
}