"use server"

import prisma from '@/libs/prisma';

export async function getSingleCourse( id : string) {
  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });

  return course;
}

