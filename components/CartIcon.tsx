"use client";

// Importaciones al inicio del archivo
import React, { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { Badge } from "./ui";

export default function CartIcon() {
  const cart = useCartStore((state) => state.cart);

  // Usa un efecto para rehidratar el estado del carrito
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // Calcula la cantidad total una sola vez para evitar recálculos innecesarios
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCartIcon className="w-6 h-6 text-white" />
      {totalQuantity > 0 && (
        <div className="absolute -top-4 -right-3">
          <Badge>{totalQuantity}</Badge>
        </div>
      )}
    </div>
  );
}