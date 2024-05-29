"use server"

import prisma from '@/libs/prisma';

export async function getReviewsByCourse(courseId: string) {

  try {
    const reviews = await prisma.review.findMany(
      {
      where: {
          courseId: courseId,
      },
      include: {
        course: true,
        user: true
      },
    }
  );
  
    return reviews;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener revisiones del curso:", error);
    throw error; // Re-lanza el error para que el manejador de errores en un nivel superior pueda capturarlo
  }
}
