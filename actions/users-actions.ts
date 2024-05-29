"use server";

import prisma from "@/libs/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified?: boolean;
}

export async function createUser(data: FormData) {
  try {
    // await prisma.user.create({
    //   data: data,
    // });
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        image: data.image,
      },
    });
    revalidatePath("/dashboard/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    revalidatePath("/dashboard/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}

export async function updateUser(data: FormData, userId: string) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        image: data.image,
      },
    });
    revalidatePath("/dashboard/users");
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error };
  }
}
