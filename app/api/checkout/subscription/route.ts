import { auth } from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // obtener id del usuario
    const session = await auth();
    const body = await request.json();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const result = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      metadata: {
        userId: session.user.id,
      },
      line_items: [
        {
          price: body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/subscriptions",
    });

    return NextResponse.json({
      url: result.url,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
