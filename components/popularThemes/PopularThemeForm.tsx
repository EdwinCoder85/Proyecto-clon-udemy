"use client";

import { Button, Card, Label } from "@/components/ui";
import { useForm, SubmitHandler } from "react-hook-form";
import { popularThemeSchema } from "@/schemas/popularThemeSchema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, Course } from "@/interfaces";
import Select from "react-select";
import Loading from "../Loading";
import { createPopularTheme } from "@/actions/popularThemes-actions";
import { useEffect, useState } from "react";
import { getCoursesByCategoryId } from '@/actions/getCoursesByCategoryId';

type Props = {
  categories: Category[];
};

type FormData = {
  categories: string;
  courses: string;
  themes: string;
};

type Theme = {
  id: string;
  name: string;
};

const themes: Theme[] = [
  { id: "Python", name: "Python" },
  { id: "Excel", name: "Excel" },
  { id: "Desarrollo web", name: "Desarrollo web" },
  { id: "Javascript", name: "Javascript" },
  { id: "Ciencia de la informacion", name: "Ciencia de la informacion" },
  { id: "Amazon AWS", name: "Amazon AWS" },
  { id: "Dibujo", name: "Dibujo" },
];

export default function PopularThemeForm({
  categories,
}: Props) {
  const [isClient, setIsClient] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const fetchCourses = async () => {
        try {
          const fetchedCourses  = await getCoursesByCategoryId(selectedCategoryId);
          setCourses(fetchedCourses);
        } catch (error) {
          console.error("Error fetching courses: ", error);
          toast.error("Error loading courses");
        }
      };

      fetchCourses();
    } else {
      setCourses([]);
    }
  }, [selectedCategoryId]);

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(popularThemeSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const res = await createPopularTheme(data);

    if (res.ok) {
      toast.success("Tema registrado exitosamente.");
    } else {
      toast.error("El tema ya está registrado.");
    }
  };

  if (!isClient) {
    return null; // O un loader, si prefieres mostrar algo mientras tanto
  }

  return (
    <section className="h-[calc(100vh-7rem)] flex flex-col items-center justify-center">
      <Card>
        <form className="w-[300px] lg:w-full select-none" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row gap-x-4">
            <div className="w-96">
              <Label>Categorías</Label>
              <Select
                className="rounded-xl w-full outline-none shadow-sm bg-primary-200 hover:bg-primary-600"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("categories", selectedOption.value);
                    setSelectedCategoryId(selectedOption.value); 
                  } else {
                    setValue("categories", "");
                    setSelectedCategoryId(null);
                  }
                }}
              />
              {errors.categories && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.categories.message}
                </span>
              )}
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
              {errors.courses && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.courses.message}
                </span>
              )}
              <Label>Tema Popular</Label>
              <Select
                className="bg-gray-100 rounded-xl w-full outline-none"
                options={themes.map((theme) => ({
                  value: theme.id,
                  label: theme.name,
                }))}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("themes", selectedOption.value);
                  } else {
                    setValue("themes", "");
                  }
                }}
              />
              {errors.themes && (
                <span className="text-red-500 text-xs relative left-1">
                  {errors.themes.message}
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
