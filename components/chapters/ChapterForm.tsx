"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { chapterSchema } from "@/schemas/chapterSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Course } from "@/interfaces";
import Select from "react-select";
import Loading from "../Loading";
import { createChapter } from "@/actions/chapters-actions";

type Props = {
  courses: Course[];
};

type FormData = {
  title: string;
  content: string;
  courses: string;
};

export default function ChapterForm({ courses }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(chapterSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await createChapter(data);
    if (res.ok) {
      toast.success("Registro realizado");
    } else {
      toast.error("Ocurrio problemas en el registro");
    }
  };

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form className="w-full select-none" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-4">
            <div className="w-96">
              <Label>Cursos</Label>
              <Select
                className="bg-gray-100 rounded-xl w-full outline-none"
                options={courses.map((course) => ({
                  value: course.id,
                  label: course.title,
                }))}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("courses", selectedOption.value);
                  } else {
                    setValue("courses", "");
                  }
                }}
              />
              <Label>Título del Capítulo</Label>
              <Textarea
                rows={5}
                placeholder="Título del Capítulo"
                {...register("title")}
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
                {...register("content")}
              />
              {errors.content && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.content.message}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="block mt-2" disabled={isSubmitting}>
            {isSubmitting ? <Loading title={"Enviando..."} /> : "Enviar"}
          </Button>
        </form>
      </Card>
    </section>
  );
}
