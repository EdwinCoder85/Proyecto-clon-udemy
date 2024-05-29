import { z } from "zod";

export const popularThemeSchema = z.object({
  categories: z.string().min(3).max(50).optional().refine((val) => !!val, {
    message: "Por favor, selecciona una categoría.",
  }),
  courses: z.string().min(3).max(50).optional().refine((val) => !!val, {
    message: "Por favor, selecciona un curso.",
  }),
  themes: z.string().min(3).max(50).optional().refine((val) => !!val, {
    message: "Por favor, selecciona un tema.",
  }),
});
