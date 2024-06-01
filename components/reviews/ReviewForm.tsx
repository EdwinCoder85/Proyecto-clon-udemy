"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Label, Textarea } from "../ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/schemas/reviewSchema";
import { toast } from "sonner";
import StartRate from "../StartRateClick";
import { createReview } from "@/actions/reviews-actions";

type FormData = {
  rating: number;
  commentary: string;
};

export default function ReviewForm({ courseId }: { courseId: string }) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 1,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    const res = await createReview(data, courseId);

    if (res?.ok) {
      toast.success("Calificación enviada");
      reset();
      setRating(1);
    } else {
      toast.error("Necesita iniciar sesión para comentar");
    }
  };

  const [rating, setRating] = useState(1);

  useEffect(() => {
    register("rating"); // Registra "rating" cada vez que cambie
  }, [register]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex gap-x-2">
          <Label>Califica</Label>
          <StartRate
            rating={rating}
            onRatingChange={(newRating) => {
              handleRatingChange(newRating);
              setValue("rating", newRating); // Aquí registramos el nuevo valor con react-hook-form
            }}
          />
          <Input type="number" hidden {...register("rating")} />
          {errors.rating && (
            <span className="text-red-500 text-xs relative left-1">
              {errors.rating.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <Label>Ingresa tu comentario</Label>
          <Textarea rows={3} placeholder="" {...register("commentary")} />
          {errors.commentary && (
            <span className="text-red-500 text-xs relative left-1">
              {errors.commentary.message}
            </span>
          )}
        </div>
      </div>
      <Button type="submit" className="block mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
}
