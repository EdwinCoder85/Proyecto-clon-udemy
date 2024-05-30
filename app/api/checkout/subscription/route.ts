import { auth } from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // obtener id del usuario
    const body = await request.json();
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }
  
    const result = await stripe.checkout.sessions.create({
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
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/subscriptions`,
      // pago por suscripción
      mode: "subscription",
    });

    return NextResponse.json({ url: result.url });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
