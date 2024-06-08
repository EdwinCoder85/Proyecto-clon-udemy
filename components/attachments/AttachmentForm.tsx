"use client";

import { Button, Card, Input, Label, Textarea } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Chapter, Course, FormState } from "@/interfaces";
import Select from "react-select";
import Loading from "../Loading";
import { createAttachment } from '@/actions/attachments-actions';
import { useEffect, useState } from 'react';
import { getChaptersByCourseId } from '@/actions';
import { attachmentSchema } from '@/schemas/attachmentSchema';

type Props = {
  courses: Course[];
};

type FormData = {
  name: string;
  url: string;
  courses: string;
  chapters: string;
  duration: string;
};

export default function AttachmentForm({ courses }: Props) {
  const [isClient, setIsClient] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(attachmentSchema),
  });

  useEffect(() => {
    if (selectedCourseId) {
      const fetchChapters = async () => {
        try {
          const fetchedChapters = await getChaptersByCourseId(selectedCourseId);
          setChapters(fetchedChapters);
        } catch (error) {
          console.error("Error fetching chapters: ", error);
          toast.error("Error loading chapters");
        }
      };

      fetchChapters();
    } else {
      setChapters([]);
    }
  }, [selectedCourseId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // O un loader, si prefieres mostrar algo mientras tanto
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await createAttachment(data);
    if (res.ok) {
      toast.success("Registro realizado");
    } else {
      toast.error("Ocurrio problemas en el registro");
    }
  };


  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form className="w-[300px] lg:w-full select-none" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-4">
            <div className="lg:w-96">
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
                    setSelectedCourseId(selectedOption.value); // Set the selected course ID
                  } else {
                    setValue("courses", "");
                    setSelectedCourseId(null);
                  }
                }}
              />
              <Label>Capítulos</Label>
              <Select
                className="bg-gray-100 rounded-xl w-full outline-none"
                options={chapters.map((chapter) => ({
                  value: chapter.id,
                  label: chapter.title,
                }))}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("chapters", selectedOption.value);
                  } else {
                    setValue("chapters", "");
                  }
                }}
              />
              <Label>Nombre del Video</Label>
              <Textarea
                rows={5}
                placeholder="Nombre del adjunto"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.name.message}
                </span>
              )}
              <Label>URL del Video</Label>
              <Textarea
                rows={5}
                placeholder="Url del video"
                {...register("url")}
              />
              {errors.url && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.url.message}
                </span>
              )}
              <Label>Duración del Video</Label>
              <Input
                type="text"
                placeholder="05:20"
                {...register("duration")}
              />
              {errors.duration && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.duration.message}
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
