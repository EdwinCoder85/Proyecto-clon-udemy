import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Debe seleccionar al menos una estrella")
    .max(5, "No puede seleccionar más de 5 estrellas"),
  commentary: z
    .string()
    .min(3, {
      message: "La descripción debe tener al menos 3 caracteres",
    })
    .max(180, {
      message: "La descripción  debe tener menos de 180 caracteres",
    }),
});
