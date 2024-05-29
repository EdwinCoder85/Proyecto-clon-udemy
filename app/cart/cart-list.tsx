"use client";

import { Button } from "@/components/ui";
import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { PaypalButton } from "./paypal-button";
import Image from "next/image";
import StartRate from "@/components/StartRate";

export function CartList() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const { data: session } = useSession();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!session) {
      return router.push("/auth/login");
    } else {
      try {
        const result = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify(cart),
        });
        const data = await result.json();
        if (result.ok) {
          cart.forEach((product) => {
            removeFromCart(product);
            localStorage.removeItem("cartStore");
          });
          window.location.href = data.url;
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="border-t-0 border-slate-600">
      <div className="my-10">
        <h1 className="text-4xl font-bold text-[#2d2f31]">Cesta</h1>
      </div>
      <div className="flex justify-between gap-x-10 max-w-screen-2xl">
        <div className="">
          <span className="font-bold">{cart.length} cursos en la cesta</span>
          {cart.map((course) => (
            <article
              key={course.id}
              className="flex flex-col bg-white border-t border-slate-300 p-2"
            >
              <div className="flex gap-x-4 justify-between">
                <div className="flex gap-x-4 w-auto">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-32 h-16 object-cover object-center"
                    width={800}
                    height={800}
                    priority={true}
                  />
                  <div>
                    <h2 className="font-bold">{course.title}</h2>
                    <p className="text-xs">Por {course.user?.username}</p>
                    <div className="flex space-x-1">
                      <h3 className="text-orange-800 font-bold">
                        {course.vote}
                      </h3>
                      <StartRate rating={course.vote} />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="flex gap-x-1 font-bold text-primary-600">
                    <span>
                      {course.price.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span>S/</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="rounded-none shadow-none bg-white text-primary-600 text-xs hover:bg-white"
                  onClick={() => removeFromCart(course)}
                >
                  Eliminar
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-[#6a6f73] font-bold">Total:</span>
          <span className="text-3xl font-bold">
            {cart
              .reduce((acc, p) => acc + p.price * p.quantity, 0)
              .toLocaleString("es-ES", {
                minimumFractionDigits: 2,
              })}{" "}
            S/
          </span>
          <Button
            className="rounded-none px-4 py-3 font-bold"
            type="button"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <div className="border-t border-slate-300 pt-3">
            <span className="font-bold">Promociones</span>
          </div>
          <div className="border-2 border-slate-300 border-dotted py-3 px-2">
            <p className="text-xs">Se ha aplicado KEEPLEARNING</p>
            <p className="text-xs">Cupón de Udemy</p>
          </div>
          <div className="flex">
            <p className="text-slate-400 text-xs border border-black pl-4 pr-30 py-2 w-full">
              Introducir el cupón
            </p>
            <button
              className="text-white text-sm bg-primary-600 px-4 py-2"
              type="button"
            >
              Aplicar
            </button>
          </div>
          {/* <PaypalButton /> */}
        </div>
      </div>
    </section>
  );
}
