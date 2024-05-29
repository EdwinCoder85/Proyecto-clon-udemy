export const dynamic = 'force-dynamic'

import { Metadata } from "next";
import { getAllCategories, getAllCourses, getAllUsers } from '@/actions';
import PopularThemeForm from '@/components/popularThemes/PopularThemeForm';

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

export default async function CoursePage() {
  const categories  = await getAllCategories();
  const courses  = await getAllCourses();
  const users  = await getAllUsers();

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <PopularThemeForm categories ={categories} courses={courses} />
    </section>
  );
}