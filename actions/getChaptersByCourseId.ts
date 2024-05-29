"use server";

import prisma from "@/libs/prisma";

export async function getChaptersByCourseId(courseId: string) {
  try {
    const chapters = await prisma.chapter.findMany({
      where: {
        courseId: courseId,
      },
      orderBy: {
        createdAt: 'asc', // Ordenar por fecha de creación de manera ascendente
      },
    });

    return chapters;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener revisiones del curso:", error);
    throw error; // Re-lanza el error para que el manejador de errores en un nivel superior pueda capturarlo
  }
}
