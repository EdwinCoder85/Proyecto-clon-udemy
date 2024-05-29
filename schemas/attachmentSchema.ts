import { z } from "zod";

export const attachmentSchema = z.object({
  courses: z
    .string()
    .min(3)
    .max(300)
    .optional()
    .refine((val) => !!val, {
      message: "Por favor, selecciona un curso.",
    }),
  chapters: z
    .string()
    .min(3)
    .max(300)
    .optional()
    .refine((val) => !!val, {
      message: "Por favor, selecciona un capítulo.",
    }),
  name: z
    .string()
    .min(10, {
      message: "El título debe tener al menos 10 caracteres",
    })
    .max(300, {
      message: "El título debe tener menos de 300 caracteres",
    }),
  url: z
    .string()
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(400, {
      message: "La descripción  debe tener menos de 400 caracteres",
    }),
  duration: z
    .string()
    .min(5, {
      message: "La duración debe tener al menos 5 caracteres",
    })
    .max(8, {
      message: "La duración  debe tener menos de 8 caracteres",
    }),
});
