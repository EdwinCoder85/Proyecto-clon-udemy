"use server";

import prisma from "@/libs/prisma";

export async function createCategory(data: {
  name: string;
  description: string;
}) {
  try {
    await prisma.category.create({
      data: data,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function updateCategory(
  data: { name: string; description: string },
  categoryId: string
) {
  try {
    await prisma.category.update({
      where: { id: categoryId },
      data: data,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}
