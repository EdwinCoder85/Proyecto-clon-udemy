"use server";

import prisma from "@/libs/prisma";

export async function getAllCourses() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    });
  
    return courses;
  } catch (error) {
    console.error("Error al obtener revisiones del curso:", error);
    throw error;
  }
}
