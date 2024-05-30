import { auth } from "@/auth.config";
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const cart = await request.json();
    const session = await auth();

    const productsIds = cart.map((product: any) => product.id);

    const courses = await prisma.course.findMany({
      where: {
        id: {
          in: productsIds,
        },
      },
    });

    const coursesWithQuantity = courses.map((course) => {
      const courseInCart = cart.find((p: any) => p.id === course.id);

      return {
        ...course,
        quantity: courseInCart.quantity,
      };
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
    }

    const courseString = JSON.stringify(
      coursesWithQuantity.map((course) => ({
        id: course.id,
        quantity: course.quantity,
      }))
    );

    const result = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        userId: session.user.id,
        products: courseString,
      },
      line_items: [
        ...courses.map((course) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              images: [course.imageUrl],
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: coursesWithQuantity.find((p) => p.id === course.id)
            ?.quantity,
        })),
      ],
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      // pago por compra de curso
      mode: "payment",
    });
    return NextResponse.json({ url: result.url });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }
}
