"use client";

import Link from "next/link";
import { navbarRoutes } from "@/routes/routes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CartIcon from "./CartIcon";
import { MyPopover } from "./ui";
import { MenuMobile } from "./MenuMobile";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

export default function Navbar() {
  const { data: session } = useSession();
  const [showMenuMobile, setShowMenuMobile] = useState<boolean>(false);

  return (
    <>
      <nav className="w-full h-20 flex justify-between items-center bg-primary-600 shadow-lg shadow-slate-300 text-white px-4 md:px-10 py-3 z-10">
        {/* logo */}
        <section>
          <Link href="/">
            <h1 className="text-lg md:text-xl font-bold">Course Programming</h1>
          </Link>
        </section>

        {/* opciones */}
        <section className="hidden lg:flex">
          <ul className="flex justify-center items-center gap-x-4 md:gap-x-6">
            {session ? (
              <>
                {navbarRoutes.map(
                  (route) =>
                    route?.auth.includes(true) && (
                      <li key={route.href} className="text-sm md:text-base">
                        <Link href={route.href}>
                          {route.text === "Carrito" ? <CartIcon /> : route.text}
                        </Link>
                      </li>
                    )
                )}
                <li>
                  <div className="hidden lg:flex lg:items-center lg:gap-x-2">
                    <MyPopover session={session} />
                    <div className="hidden md:flex flex-col items-end">
                      <p className="text-sm md:text-base">
                        {session.user?.email}
                      </p>
                      <p className="font-bold text-sm md:text-base">
                        role: {session.user?.role}
                      </p>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                {navbarRoutes.map(
                  (route) =>
                    route.auth.includes(false) && (
                      <li key={route.href} className="text-sm md:text-base">
                        <Link href={route.href}>
                          {route.text === "Iniciar Sesión" ? (
                            <span className="bg-white px-2 py-1 md:px-2 md:py-3 text-primary-600 font-bold">
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
              </>
            )}
          </ul>
        </section>

        {/* mobile menu button */}
        <section className="flex gap-x-2 lg:hidden">
          <div>
            {session && <MyPopover session={session} />}
          </div>
          <div>
            <button
              type="button"
              onClick={() => setShowMenuMobile(true)}
              className="flex items-center justify-center rounded-md px-1 py-2.5 text-white"
              title="Open menu"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </section>
      </nav>
      <MenuMobile
        isOpen={showMenuMobile}
        onClose={() => setShowMenuMobile(false)}
      />
    </>
  );
}
