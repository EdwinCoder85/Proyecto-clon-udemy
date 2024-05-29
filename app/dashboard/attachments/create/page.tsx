export const dynamic = 'force-dynamic'

import { Metadata } from "next";
import { getAllCourses } from '@/actions';
import AttachmentForm from '@/components/attachments/AttachmentForm';

export const metadata: Metadata = {
  title: "Nextfull - Crear Curso",
  description: "Crear un nuevo curso",
};

export default async function CoursePage() {
  const courses  = await getAllCourses();

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <AttachmentForm courses ={courses} />
    </section>
  );
}