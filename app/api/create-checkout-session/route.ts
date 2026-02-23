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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/apply?paid=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/apply`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}