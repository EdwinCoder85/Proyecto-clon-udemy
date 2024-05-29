"use server";

import prisma from "@/libs/prisma";

export async function createPopularTheme(data: {
  courses: string;
  categories: string;
  themes: string;
}) {
  try {
    await prisma.courseCategory.create({
      data: {
        courseId: data.courses,
        categoryId: data.categories,
        popularTheme: data.themes,
      },
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}
