"use client";

import { Course } from "@/interfaces";
import { useCartStore } from "@/store/cartStore";
import { toast } from "sonner";
import { Button } from './ui';

export const Price = ({ course }: { course: Course }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const handleAddCart = () => {
    if (!isCourseInCart) {
      addToCart(course);
      toast.success("Curso agregado a la cesta!");
    }
  };

  const isCourseInCart = cart.some((item) => item.id === course.id);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full py-2">
        <h2 className="text-4xl font-bold">
          {course.price.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
          })}{" "}
          S/
        </h2>
      </div>
      <Button
        className={`text-white font-bold bg-primary-600 w-full px-2 py-3 mt-2 ${
          isCourseInCart && "bg-gray-500 cursor-not-allowed"
        }`}
        onClick={handleAddCart}
        disabled={isCourseInCart}
      >
        {isCourseInCart ? "Agregado al carrito" : "Añadir a la cesta"}
      </Button>
    </div>
  );
};
