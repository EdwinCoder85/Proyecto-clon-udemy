"use server";

import prisma from "@/libs/prisma";

export async function getAllCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  
    return categories;
  } catch (error) {
    console.error("Error al obtener revisiones del curso:", error);
    throw error;
  }
}
