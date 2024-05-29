"use server";

import { Course } from "@prisma/client";
import prisma from "@/libs/prisma";

export async function getCoursesByPopularTheme( categoryName: string ): Promise<Course[]> {
 
  try {
    const courses = await prisma.courseCategory.findMany( {
      where: {
        popularTheme: categoryName
      },
      include: {
        course: {
          include: {
            user: true // Incluye el usuario asociado a cada curso
          }
        }
      }
    } );

    const coursesData: Course[] = courses.map( courseCategory => courseCategory.course );

    return coursesData;
  } catch ( error ) {
    throw new Error( "Error fetching courses by popular theme: " + `${error}` );
  }
}