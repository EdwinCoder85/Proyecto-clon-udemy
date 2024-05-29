export const dynamic = 'force-dynamic'

import { Metadata } from "next";
import prisma from "@/libs/prisma";
import CourseForm from "@/components/courses/CourseForm";
import { getAllCategories } from '@/actions';

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

export default async function CoursePage() {
  // const categories  = await prisma.category.findMany();
  const categories  = await getAllCategories();

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <CourseForm categories ={categories} />
    </section>
  );
}