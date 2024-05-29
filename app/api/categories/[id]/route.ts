import prisma from "@/libs/prisma";
import { messages } from "@/utils/messages";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params: { id } }: Params) {
  try {
    const { name, description } = await request.json();

    const updateCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(updateCategory);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: messages.error.categoryNotFound },
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