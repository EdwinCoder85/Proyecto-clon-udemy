import { CartStore } from '@/interfaces';
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (course) => {
        // obtener el estado del carrito
        const cart = useCartStore.getState().cart;
       
        const courseInCart = cart.find((p) => p.id === course.id);

        if (courseInCart) {
          const newCart = cart.map((p) =>
            p.id === course.id ? { ...p, quantity: p.quantity + 1 } : p
          );
          set((state) => ({
            cart: newCart,
          }));
          return;
        }

        set((state) => ({
          cart: [
            ...state.cart,
            {
              ...course,
              quantity: 1,
            },
          ],
        }));
      },
      removeFromCart: (course) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== course.id),
        })),
    }),
    { name: "cartStore" }
  )
);