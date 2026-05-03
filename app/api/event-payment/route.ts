import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount, type, eventName } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nzsme.org";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "nzd",
            product_data: {
              name: `${eventName} (${type})`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${baseUrl}/event-success`,
      cancel_url: `${baseUrl}/events/register`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}