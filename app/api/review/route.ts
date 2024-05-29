import { Review } from '@/interfaces';
import prisma from "@/libs/prisma";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: Review = await request.json();
    const { rating, commentary, courseId, userId, image } = body;

    const review = await prisma.review.create({
      data: {
        rating: rating,
        commentary: commentary,
        courseId: courseId,
        userId: userId,
        image: image
      },
    });

    return NextResponse.json(
      { review: review, message: messages.sucess.reviewCreated },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default, error },
      { status: 400 }
    );
  }
}


