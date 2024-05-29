import { CourseCategory } from '@/interfaces';
import prisma from '@/libs/prisma';
import { messages } from '@/utils/messages';
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req: NextRequest) {
  try {
    const body: CourseCategory = await req.json();
    const { courseId, categoryId, popularTheme  } = body;

    const courseCategory = await prisma.courseCategory.create({
      data: {
        courseId,
        categoryId,
        popularTheme
      },
    });
    return NextResponse.json(
      { courseCategory: courseCategory, message: messages.sucess.popularThemeCreated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      { status: 500 }
    );
  }
}