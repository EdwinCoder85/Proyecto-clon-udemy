import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params: { id } }: Params) {
  try {
    const courseDeleted = await prisma.course.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      { courseDeleted: courseDeleted, message: messages.sucess.courseDeleted },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: messages.error.courseNotFound },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  try {
    const { title, description, imageUrl, price, categoryId } =
      await request.json();

    const courseUpdated = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        title,
        description,
        imageUrl,
        price,
        categoryId,
      },
    });

    return NextResponse.json(
      { courseUpdated: courseUpdated, message: messages.sucess.courseUpdated },
      { status: 202 }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: messages.error.courseNotFound },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  }
}

// GET SINGLE PRODUCT
export async function GET(request: NextRequest,{ params: { id } }: Params)  {

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });
    return new NextResponse(JSON.stringify(course), { status: 200 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
