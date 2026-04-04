import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: "NZSME Membership - Annual",
            },
            unit_amount: 6000,
          },
          quantity: 1,
        },
      ],

      // ✅ IMPORTANT: add session_id
      success_url:
        "https://nzsme.org/apply?paid=true&session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "https://nzsme.org/apply",

      // ✅ OPTIONAL but useful (future use)
      metadata: {
        source: "nzsme_membership",
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe session URL not created" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}