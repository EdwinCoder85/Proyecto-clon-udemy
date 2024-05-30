"use server";

import prisma from "@/libs/prisma";

export async function createPopularTheme(data: {
  courses: string;
  categories: string;
  themes: string;
}) {
  try {
    // Check if the popular theme already exists
    const existingTheme = await prisma.courseCategory.findFirst({
      where: {
        courseId: data.courses,
        categoryId: data.categories,
        popularTheme: data.themes,
      },
    });

    if (existingTheme) {
      // Theme already registered
      return { ok: false, message: "El tema ya está registrado." };
    }

    // Create a new popular theme
    await prisma.courseCategory.create({
      data: {
        courseId: data.courses,
        categoryId: data.categories,
        popularTheme: data.themes,
      },
    });

    return { ok: true, message: "Tema registrado exitosamente." };
  } catch (error) {
    return { ok: false, message: "Error al registrar el tema." };
  }
}

