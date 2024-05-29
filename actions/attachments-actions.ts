"use server";

import prisma from "@/libs/prisma";

export async function createAttachment(data: {
  name: string;
  url: string;
  courses: string;
  chapters: string;
  duration: string;
}) {
  try {
    const attachment = await prisma.attachment.create({
      data: {
        name: data.name,
        url: data.url,
        courseId: data.courses,
        chapterId: data.chapters,
        duration: data.duration,
      },
    });
    // Ensure attachment.chapterId is not null before querying the chapter
    if (attachment.chapterId) {
      // Obtener el capítulo al que pertenece el Attachment
      const chapter = await prisma.chapter.findUnique({
        where: { id: attachment.chapterId },
      });

      // Ensure chapter is not null before accessing its properties
      if (chapter) {
        // Incrementar el valor de classes en uno
        const updatedClasses = (chapter.classes || 0) + 1;

        // Actualizar el campo classes en la tabla Chapter
        await prisma.chapter.update({
          where: { id: attachment.chapterId },
          data: { classes: updatedClasses },
        });
      }
    }

    return { ok: true };
  } catch (error) {
    // Ensure the error is converted to a plain object if it isn't one
    return {
      ok: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
