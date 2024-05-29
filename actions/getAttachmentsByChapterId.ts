"use server";

import prisma from "@/libs/prisma";

export async function getAttachmentsByChapterId(chapterId: string) {
  try {
    const attachments = await prisma.attachment.findMany({
      where: {
        chapterId: chapterId,
      },
    });

    return attachments;
  } catch (error) {
    // Manejo de errores
    console.error("Error al obtener revisiones del curso:", error);
    throw error; // Re-lanza el error para que el manejador de errores en un nivel superior pueda capturarlo
  }
}
