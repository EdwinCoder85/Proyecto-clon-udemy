"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { cn } from '@/libs/utils';
import { navbarRoutes } from '@/routes/routes';
import { useSession } from 'next-auth/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import CartIcon from './CartIcon';

interface MenuMobileProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export const MenuMobile = ({ isOpen, onClose }: MenuMobileProps) => {
  const { data: session } = useSession();
  return (
    <>
      <div
        className={cn(
          "fixed right-0 w-full h-full lg:hidden bg-background-foreground z-50 flex flex-col items-center justify-center transition-all duration-300",
          isOpen ? "top-0 delay-300" : "-top-full"
        )}
      >
        <ul className={cn("flex flex-col items-center gap-y-6 menu-items", isOpen ? "h-auto" : "h-0")}>
          {session &&
            navbarRoutes.map(
              (route) =>
                route?.auth.includes(true) && (
                  <li key={route.href} className="text-xl text-white">
                    <Link href={route.href} onClick={() => onClose(false)}>
                    {route.text === "Carrito" ? <CartIcon /> : route.text}
                    </Link>
                  </li>
                )
            )}

          {!session &&
            navbarRoutes.map(
              (route) =>
                route.auth.includes(false) && (
                  <li key={route.href} className="text-xl text-white">
                    <Link href={route.href} onClick={() => onClose(false)}>
                    {route.text === "Iniciar Sesión" ? (
                            <span className="bg-white px-2 py-1 md:px-2 md:py-3 text-primary-600 font-semibold">
                              {route.text}
                            </span>
                          ) : route.text === "Carrito" ? (
                            <CartIcon />
                          ) : (
                            route.text
                          )}
                    </Link>
                  </li>
                )
            )}
        </ul>
      </div>
      <div
        role="button"
        title="Close menu"
        className={cn(
          "fixed bg-primary-600 z-40 lg:hidden transition-all",
          isOpen ? "w-full h-full right-0 top-0" : "w-0 h-0 left-0 bottom-0 delay-300"
        )}
        onClick={() => onClose(false)}
      />
      {isOpen && (
        <button
          type="button"
          className="fixed top-4 right-4 z-50 -m-2.5 rounded-md p-2.5 text-white lg:hidden"
          onClick={() => onClose(false)}
          title="Close menu"
          aria-label="Close menu"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      )}
    </>
  );
};
