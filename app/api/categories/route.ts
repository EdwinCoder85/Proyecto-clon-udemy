import { Category } from '@/interfaces';
import prisma from "@/libs/prisma";
import { messages } from '@/utils/messages';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: Category = await req.json();
    const { name, description } = body;

    const existingCategory = await prisma.category.findUnique({
      where: { name: name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { category: null, message: messages.error.categoryExist},
        { status: 409 }
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      { category: newCategory, message: messages.sucess.categoryCreated },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  }
}
