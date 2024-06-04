import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/libs/prisma";
import { messages } from "@/utils/messages";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET as string;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  console.log(body)
  if (!sig) {
    return NextResponse.json(
      { "Webhook Error": "No signature" },
      {
        status: 400,
      }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      if (checkoutSessionCompleted.mode === "payment") {

        const userId = checkoutSessionCompleted.metadata!.userId as string;
        const courses = JSON.parse(
          checkoutSessionCompleted.metadata!.products as string
        );
        console.log(courses, userId)
        const userFound = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            email: true,
          },
        });

        if (!userFound) {
          return NextResponse.json(
            { message: messages.error.userNotFound },
            { status: 400 }
          );
        }

        const courseDB = await prisma.course.findMany({
          where: {
            id: {
              in: courses.map((course: any) => course.id),
            },
          },
        });

        const total = courseDB.reduce((acc, course) => {
          const courseInCart = courses.find((p: any) => p.id === course.id);

          return acc + course.price * courseInCart.quantity;
        }, 0);

        const newOrder = await prisma.order.create({
          data: {
            userId: userId,
            total,
            status: "por verificar",
          },
        });


        await prisma.orderDetails.createMany({
          data: courseDB.map((course) => ({
            orderId: newOrder.id,
            courseId: course.id,
            price: course.price,
            quantity: courses.find((p: any) => p.id === course.id)?.quantity,
          })),
        });
      }

      if (checkoutSessionCompleted.mode === "subscription") {
   
        await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata!.userId,
          },
          data: {
            subscriptionId: checkoutSessionCompleted.subscription as string,
            subscriptionProvider: "stripe",
            status: checkoutSessionCompleted.payment_status as string,
            startedAt: new Date(checkoutSessionCompleted.created  * 1000)
          },
        });
      }
      break;
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }

  return new Response(null, { status: 200 });
  // return NextResponse.json("recibiendo webhook")
}
