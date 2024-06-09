"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { createProductSchema } from "@/schemas/courseSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Category, Course, FormState } from "@/interfaces";
import { createCourse, updateCourse } from "@/actions/courses-actions";
import Loading from "../Loading";

type Props = {
  course?: Course;
  categories: Category[];
};

export default function CourseForm({ course, categories }: Props) {
  const buttonMessage = course ? "Actualizar curso" : "Crear curso";
  const [title, setTitle] = useState<string>(buttonMessage);
  const [formData, setFormData] = useState<FormState>({
    title: course?.title || "",
    description: course?.description || "",
    imageUrl: course?.imageUrl || "",
    price: course?.price || 0,
    oldPrice: course?.oldPrice || 0,
    categoryId: course?.categoryId || "",
    categories: course?.categories || "",
    vote: course?.vote || 0,
    bestSeller: course?.bestSeller, // Ensure bestSeller is boolean
  });

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    formData.categoryId
  );
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    formData.imageUrl
  );

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormState>({
    resolver: zodResolver(createProductSchema),
  });

  const [file, setFile] = useState<File | undefined>();
  const [selectedFile, setSelectedFile] = useState<string>(
    "Seleccionar archivo"
  );

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(formData.imageUrl);
    }
  }, [file, formData.imageUrl]);

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const result = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await result.json();
      data.imageUrl = uploadData.secure_url;
    }

    const action = course ? updateCourse : createCourse;
    const successMessage = course ? "Curso actualizado" : "Curso creado";
    const errorMessage = course
      ? "Error al actualizar curso"
      : "Error al crear curso";

    setTitle(buttonMessage);

    const id = course?.id as string;
    const res = await action(data, id);

    if (res.ok) {
      toast.success(successMessage);
      reset();
      setPreviewUrl("");
      setSelectedFile("");
    } else {
      toast.error(errorMessage);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file.name);
      setFile(e.target.files?.[0]);
    } else {
      setSelectedFile("Seleccionar archivo");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <section className="h-full lg:h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form className="w-[300px] lg:w-full select-none" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row gap-x-4">
            <div className="">
              <Label>Nombre del Curso</Label>
              <Textarea
                rows={3}
                placeholder="Nombre"
                {...register("title")}
                defaultValue={formData.title}
              />
              {errors.title && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.title.message}
                </span>
              )}
              <Label>Descripción</Label>
              <Textarea
                rows={5}
                placeholder="Describe tu curso"
                {...register("description")}
                defaultValue={formData.description}
              />
              {errors.description && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.description.message}
                </span>
              )}
              <Label>Precio Actual</Label>
              <Input
                type="number"
                step="any"
                {...register("price", {
                  setValueAs: (value) => Number(value),
                })}
                placeholder="12.00"
                defaultValue={formData.price}
              />
              {errors.price && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.price.message}
                </span>
              )}
              <Label>Precio Antiguo</Label>
              <Input
                type="number"
                step="any"
                {...register("oldPrice", {
                  setValueAs: (value) => Number(value),
                })}
                placeholder="12.00"
                defaultValue={formData.oldPrice || 0}
              />
              {errors.oldPrice && (
                <span className="text-red-500 text-xs">
                  {errors.oldPrice.message}
                </span>
              )}
              <Label>Voto</Label>
              <Input
                type="number"
                {...register("vote", {
                  setValueAs: (value) => Number(value),
                })}
                placeholder="0"
                defaultValue={formData.vote}
              />
              {errors.vote && (
                <span className="text-red-500 text-xs">
                  {errors.vote.message}
                </span>
              )}
            </div>
            <div className="">
              <Label>Categoría</Label>
              <select
                className="bg-gray-100 rounded-xl w-[300px] lg:w-full px-4 py-3 mb-2 outline-none"
                value={selectedCategory}
                {...register("categories")}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option className="" key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categories && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.categories.message}
                </span>
              )}
              <div className="flex items-center gap-x-4">
                <Input
                  type="checkbox"
                  className="border text-lg rounded w-6 h-6 border-gray-200 text-blue-600 focus:ring-0 focus:outline-none focus:ring-offset-0 disabled:text-gray-200 disabled:cursor-not-allowed"
                  {...register("bestSeller")}
                  defaultChecked={formData.bestSeller || null || undefined}
                />
                <Label>¿Es el curso más vendido?</Label>
                {errors.bestSeller && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.bestSeller.message}
                  </p>
                )}
              </div>
              <Label>Imagen</Label>
              <Input
                type="file"
                {...register("imageUrl")}
                onChange={handleFileInputChange}
              />
              <div className="flex gap-x-4">
                {errors.imageUrl ? (
                  <span className="text-red-500 text-xs">
                    {errors.imageUrl.message}
                  </span>
                ) : (
                  <span
                    className="mt-1 text-sm text-primary dark:text-gray-900"
                    id="imageUrl_error"
                  >
                    JPG, JPGE, PNG o WEBP (10MB Max).
                  </span>
                )}
              </div>
              <div className="bg-gray-100 rounded-xl p-4 my-4 h-60 w-[300px] md:w-[450px] lg:w-full">
                {previewUrl && (
                  <div className="bg-gray-100 rounded-xl p-4 my-4">
                    <Image
                      src={previewUrl}
                      alt="Imagen cargada"
                      className="w-80 h-40 object-cover mx-auto"
                      width={400}
                      height={400}
                    />
                  </div>
                )}
                {selectedFile === "Seleccionar archivo" ? (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-secondInk
            text-white hover:bg-secondInk-700 cursor-pointer text-center transition-colors"
                  >
                    Seleccionar archivo
                  </label>
                ) : (
                  <label
                    htmlFor="photo"
                    className="block mr-4 py-2 px-4
            rounded-md border-0 text-sm font-semibold bg-thirdInk-300
            text-secondInk hover:bg-thirdInk-700 cursor-pointer text-center transition-colors"
                  >
                    {selectedFile}
                  </label>
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="block mt-2" disabled={isSubmitting}>
            {isSubmitting ? <Loading title={"Enviando..."} /> : title}
          </Button>
        </form>
      </Card>
    </section>
  );
}
