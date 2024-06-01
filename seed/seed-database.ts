import prisma from "../libs/prisma";
import { initialData } from "./seed";

async function main() {
  // Limpia las tablas antes de sembrar datos nuevos
  await prisma.attachment.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.review.deleteMany();
  await prisma.courseCategory.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const {
    users,
    categories,
    courses,
    reviews,
    chapters,
    attachments,
    courseCategories,
  } = initialData;

  // Inserta los datos de usuarios
  await prisma.user.createMany({
    data: users,
  });

  // Inserta los datos de categorías
  await prisma.category.createMany({
    data: categories,
  });

  // Supongamos que tienes una función para buscar el usuario por email
  async function findUserByEmail(userEmail: string) {
    return await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });
  }

  // Supongamos que tienes una función para buscar la categoría por nombre
  async function findCategoryByName(categoryName: string) {
    return await prisma.category.findFirst({
      where: {
        name: categoryName,
      },
    });
  }

  // Supongamos que tienes una función para buscar el curso por nombre
  async function findCourseByName(courseName: string) {
    return await prisma.course.findFirst({
      where: {
        title: courseName,
      },
    });
  }

  // Supongamos que tienes una función para buscar el capítulo por nombre
  async function findChapterByName(chapterName: string) {
    return await prisma.chapter.findFirst({
      where: {
        title: chapterName,
      },
    });
  }

  // Inserta los datos de cursos
  for (const course of courses) {
    const user = await findUserByEmail(course.userEmail);
    const category = await findCategoryByName(course.categoryName);

    if (user && category) {
      await prisma.course.create({
        data: {
          title: course.title,
          description: course.description,
          imageUrl: course.imageUrl,
          price: course.price,
          vote: course.vote,
          userId: user.id,
          categoryId: category.id,
        },
      });
    } else {
      console.error(
        `Usuario ${user} o categoría ${category} no fue encontrada para el curso: ${course.title}`
      );
    }
  }

    // Inserta los datos de opiniones
    for (const review of reviews) {
      const course = await findCourseByName(review.courseName);
      const user = await findUserByEmail(review.userEmail);
  
      if (course && user) {
        await prisma.review.create({
          data: {
            rating: review.rating,
            commentary: review.commentary,
            image: review.image,
            courseId: course.id,
            userId: user.id,
          },
        });
      } else {
        console.error(
          `Curso ${course?.title} o usuario ${user?.email} no fue encontrada para la opinión: ${review.commentary}`
        );
      }
    }

  // Inserta los datos de capítulos
  for (const chapter of chapters) {
    const course = await findCourseByName(chapter.courseName);

    if (course) {
      await prisma.chapter.create({
        data: {
          title: chapter.title,
          content: chapter.content,
          courseId: course.id,
          classes: chapter.classes,
        },
      });
    } else {
      console.error(
        `Curso ${course} no fue encontrado para el capítulo: ${chapter.title}`
      );
    }
  }

  // Inserta los datos de adjuntos
  for (const attachment of attachments) {
    const course = await findCourseByName(attachment.courseName);
    const chapter = await findChapterByName(attachment.chapterName);

    if (course && chapter) {
      await prisma.attachment.create({
        data: {
          name: attachment.name,
          url: attachment.url,
          courseId: course.id,
          chapterId: chapter.id,
          duration: attachment.duration,
        },
      });
    } else {
      console.error(
        `Curso ${course?.title} o capítulo ${chapter?.title} no fue encontrado para el adjunto: ${attachment.name}`
      );
    }
  }

  // Inserta los datos de curso categoría (temas populares)
  for (const courseCategorie of courseCategories) {
    const course = await findCourseByName(courseCategorie.courseName);
    const category = await findCategoryByName(courseCategorie.categoryName);

    if (course && category) {
      await prisma.courseCategory.create({
        data: {
          courseId: course.id,
          categoryId: category.id,
          popularTheme: courseCategorie.popularTheme,
        },
      });
    } else {
      console.error(
        `Curso ${course?.title} o categoría ${category?.name} no fue encontrado para el tema popular: ${courseCategorie.popularTheme}`
      );
    }
  }

  console.log("Seed ejecutado satisfactoriamente...");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
})();
