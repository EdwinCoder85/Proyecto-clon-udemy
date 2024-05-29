"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCategorySchema } from "@/schemas/categorySchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory, updateCategory } from "@/actions/categories-actions";
import { Category, FormStateCategory } from "@/interfaces";
import Loading from "../Loading";
import { useRouter } from 'next/navigation';

type Props = {
  category?: Category;
};

export default function CategoryForm({ category }: Props) {
  const buttonMessage = category ? "Actualizar categoria" : "Crear categoria";
  const [title, setTitle] = useState<string>(buttonMessage);
  const [formData, setFormData] = useState<FormStateCategory>({
    name: category?.name || "",
    description: category?.description || "",
  });
  const router = useRouter()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormStateCategory>({
    resolver: zodResolver(createCategorySchema),
  });

  const onSubmit: SubmitHandler<FormStateCategory> = async (data) => {
    const action = category ? updateCategory : createCategory;
    const successMessage = category
      ? "Categoria actualizado"
      : "Categoria creada";
    const errorMessage = category
      ? "Error al actualizar categoria"
      : "Error al crear categoria";

    setTitle(buttonMessage);

    const id = category?.id as string;
    const res = await action(data, id);

    if (res.ok) {
      toast.success(successMessage);
      reset();
      router.push("/dashboard/categories")
      router.refresh()
    } else {
      toast.error(errorMessage);
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-96">
            <Label>Nombre de la Categoría</Label>
            <Input
              type="text"
              placeholder="Nombre"
              {...register("name")}
              defaultValue={formData.name}
            />
            {errors.name && (
              <span className="text-red-500 text-xs relative left-1">
                {errors.name.message}
              </span>
            )}
            <Label>Descripción de la Categoría</Label>
            <Textarea
              rows={5}
              placeholder="Describe tu categoria"
              {...register("description")}
              defaultValue={formData.description}
            />
            {errors.description && (
              <span className="text-red-500 text-xs relative left-1">
                {errors.description.message}
              </span>
            )}
          </div>
          <Button type="submit" className="block mt-2" disabled={isSubmitting}>
            {isSubmitting ? <Loading title={"Enviando..."} /> : title}
          </Button>
        </form>
      </Card>
    </section>
  );
}
