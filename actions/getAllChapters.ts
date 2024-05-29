"use server";

import prisma from "@/libs/prisma";

export async function getAllChapters() {
  try {
    const chapters = await prisma.chapter.findMany({
      orderBy: {
        title: "asc",
      },
    });
  
    return chapters;
  } catch (error) {
    console.error("Error al obtener revisiones del curso:", error);
    throw error;
  }
}
