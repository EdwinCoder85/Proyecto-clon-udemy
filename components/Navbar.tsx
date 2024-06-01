import Link from "next/link";
import { navbarRoutes } from "@/routes/routes";
import { auth } from "@/auth.config";
import Image from "next/image";
import CartIcon from "./CartIcon";
import { MyPopover } from "./ui";

export const dynamic = "force-dynamic";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full h-20 flex justify-between items-center bg-primary-600 shadow-lg shadow-slate-300 text-white px-4 md:px-10 py-3 z-10">
      {/* logo */}
      <Link href="/">
        <h1 className="text-lg md:text-xl font-bold">Course Programming</h1>
      </Link>

      {/* opciones */}
      <ul className="flex justify-center items-center gap-x-4 md:gap-x-6">
        {session && (
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
              <div className="flex items-center gap-x-2">
                <MyPopover session={session} />
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm md:text-base">{session.user?.email}</p>
                  <p className="font-bold text-sm md:text-base">role: {session.user?.role}</p>
                </div>
              </div>
            </li>
          </>
        )}

        {!session &&
          navbarRoutes.map(
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
      </ul>
    </nav>
  );
}
