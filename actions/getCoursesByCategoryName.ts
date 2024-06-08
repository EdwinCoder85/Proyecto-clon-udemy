"use server"

import prisma from '@/libs/prisma';

export async function getCoursesByCategoryName( categoryName : string) {
      const courses = await prisma.course.findMany({
    where: {
      courseCategory: {
        name: categoryName,
      },
    },
    include: {
      user: true
    },
  })

    return courses
}

