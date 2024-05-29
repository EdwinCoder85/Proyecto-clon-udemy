import { z } from "zod";

export const chapterSchema = z.object({
  courses: z
    .string()
    .min(3)
    .max(100)
    .optional()
    .refine((val) => !!val, {
      message: "Por favor, selecciona un curso.",
    }),
  title: z
    .string()
    .min(8, {
      message: "El título debe tener al menos 10 caracteres",
    })
    .max(300, {
      message: "El título debe tener menos de 300 caracteres",
    }),
  content: z
    .string()
    .min(8, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(400, {
      message: "La descripción  debe tener menos de 400 caracteres",
    }),
});
