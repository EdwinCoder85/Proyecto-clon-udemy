"use server"

import prisma from '@/libs/prisma';

export async function getCoursesByCategory( categoryName : string) {
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

