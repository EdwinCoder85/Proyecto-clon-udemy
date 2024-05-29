"use server";

import prisma from "@/libs/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc",
      },
    });
  
    return users;
  } catch (error) {
    console.error("Error al obtener revisiones del curso:", error);
    throw error;
  }
}
