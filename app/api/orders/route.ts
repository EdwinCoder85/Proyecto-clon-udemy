
import { auth } from '@/auth.config';
import prisma from '@/libs/prisma';
import { messages } from '@/utils/messages';
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await auth();

  if (session) {
    try {
      const orders = await prisma.order.findMany({
        where: {
          id: session.user.id,
        },
      });
      // return new NextResponse(JSON.stringify(orders), { status: 200 });
      return NextResponse.json(
        { order: orders, message: messages.sucess.getOrderList },
        { status: 200 })
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: messages.error.notAuthorized },
      { status: 401 }
    );
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (session) {
    try {
      const body = await req.json();
      const order = await prisma.order.create({
        data: body,
      });
      return NextResponse.json(
        { order: order, message: messages.sucess.orderListCreated },
        { status: 201 })
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: messages.error.notAuthorized },
      { status: 401 }
    );
  }
};
