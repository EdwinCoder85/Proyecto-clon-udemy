"use server";

import { auth } from "@/auth.config";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

interface FormData {
  // userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  oldPrice?: number | null;
  categories: string;
  vote: number;
  bestSeller?: boolean | null;
}

export async function createCourse(data: FormData) {
  const session = await auth();

  try {
    if (session) { 
      await prisma.course.create({
        data: {
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          price: data.price,
          oldPrice: data.oldPrice,
          vote: data.vote,
          bestSeller: data.bestSeller,
          userId: session?.user.id,
          categoryId: data.categories,

        },
      });
    }
    revalidatePath("/dashboard/courses");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    revalidatePath("/dashboard/courses");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function updateCourse(data: FormData, courseId: string) {

  const session = await auth();
  try {
    await prisma.course.update({
      where: { id: courseId },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        price: data.price,
        oldPrice: data.oldPrice,
        vote: data.vote,
        bestSeller: data.bestSeller,
        userId: session?.user.id,
        categoryId: data.categories,

      },
    });
    revalidatePath("/dashboard/courses");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}
