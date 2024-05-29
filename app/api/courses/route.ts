import prisma from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/utils/messages";
import { auth } from "@/auth.config";
import { Course } from '@/interfaces';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: messages.error.notAuthorized },
        { status: 401 }
      );
    }
    
    const body: Course = await req.json();
 
    const {
      title,
      description,
      imageUrl,
      price,
      categoryId,
      oldPrice,
      vote,
      bestSeller,
    } = body;

    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        price: price,
        userId: session.user.id,
        categoryId,
        oldPrice: oldPrice,
        vote,
        bestSeller,
      },
    });

    return NextResponse.json(
      { course: newCourse, message: messages.sucess.courseCreated },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json(
  //     { message: messages.error.notAuthorized },
  //     { status: 401 }
  //   );
  // }

  // return NextResponse.json({ authenticated: !!session });

  try {
    const courses = await prisma.course.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  }
}
