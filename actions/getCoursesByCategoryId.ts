"use server";

import prisma from "@/libs/prisma";

export async function getCoursesByCategoryId(categoryId: string) {
  const courses = await prisma.course.findMany({
    where: {
      categoryId: categoryId,
    },
    orderBy: {
      createdAt: "asc", // Ordenar por fecha de creación de manera ascendente
    },
  });

  return courses;
}
