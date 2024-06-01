"use server";

import { auth } from "@/auth.config";
import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function createReview(
  data: { rating: number; commentary: string },
  courseId: string
) {
  const session = await auth();
  try {
    if (session) {
      await prisma.review.create({
        data: {
          ...data,
          userId: session?.user.id,
          courseId: courseId,
          image: session?.user.image,
        },
      });
      revalidatePath(`/course/${courseId}`);
      return { ok: true };
    }
  } catch (error) {
    return { ok: false, message: error };
  }
}
