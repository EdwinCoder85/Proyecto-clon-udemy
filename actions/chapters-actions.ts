"use server";

import prisma from "@/libs/prisma";

export async function createChapter(data: {
  title: string;
  content: string;
  courses: string;
}) {
  try {
    await prisma.chapter.create({
      data: {
        title: data.title,
        content: data.content,
        courseId: data.courses,
        classes: 0
      },
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}
