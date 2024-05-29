export const dynamic = "force-dynamic";

import prisma from "@/libs/prisma";
import { Metadata } from "next";
import CategoryForm from "@/components/categories/CategoryForm";

export const metadata: Metadata = {
  title: "Nextfull - Actualizar Categoría",
  description: "Actualizar una nueva categoría",
};

interface Params {
  params: { id: string };
}

export default async function CategoryPage({ params: { id } }: Params) {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });

  if (!category) {
    return <div>Categoria no encontrada</div>;
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center overflow-hidden overflow-y-scroll">
      <CategoryForm category={category} />
    </section>
  );
}
