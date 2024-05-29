import { Metadata } from "next";
import prisma from "@/libs/prisma";
import CourseForm from '@/components/courses/CourseForm';
import { getAllCategories } from '@/actions';

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

interface Params {
  params: { id: string };
}

export default async function CoursePage({ params: { id } }: Params) {
  // const categories = await prisma.category.findMany();
  const categories  = await getAllCategories();

  const course = await prisma.course.findUnique({
    where: {
      id: id,
    },
    include: {
      courseCategory: true,
    },
  });

  if (!course) {
    return <div>Curso no encontrado</div>;
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <CourseForm course={course} categories={categories} />
    </section>
  );
}
