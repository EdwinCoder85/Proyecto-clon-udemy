import prisma from '@/libs/prisma';
import { messages } from '@/utils/messages';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Params) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        courseId: id,
      },
      // include: {
      //   course: true,
      //   user: true
      // },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: messages.error.default },
        { status: 500 }
      );
    }
  }
}