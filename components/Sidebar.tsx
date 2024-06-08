"use client";

import Link from "next/link";
import { dashboardRoutes } from "@/routes/routes";
import { classNames } from "@/libs/classNames";
import ButtonSignOut from "./ButtonSignOut";
import { RiCloseLine, RiMenu3Fill } from 'react-icons/ri';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const dynamic = "force-dynamic";

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // const router = useRouter();
  // const pathname = router.pathname;

  const { data: session } = useSession();

  return (
    <>
      <div className={`fixed lg:static top-20 lg:top-0 w-auto h-[calc(100vh-5.4rem)] lg:h-full bg-slate-100 border border-primary-600 p-4 flex flex-col justify-between transition-all z-50 ${
            showMenu ? "left-0" : "-left-full lg:left-0"
          }`}>
        <div className="flex flex-col w-full">
          {session && (
            <div>
              <ul className="flex flex-col w-full gap-y-4">
                {dashboardRoutes.map(
                  (item) =>
                    item.roles.includes(session?.user.role || "") && (
                      <li key={item.text} className="list-none">
                        <Link
                          href={item.href}
                          // className={classNames(
                          //   pathname === item.href
                          //     ? "bg-white text-primary-600"
                          //     : "text-primary-600 hover:text-white hover:bg-primary-600",
                          //   "group flex gap-3 rounded-xl transition-colors py-2 px4 text-base leading-6 font-bold"
                          // )}
                          className="text-primary-600 hover:text-white hover:bg-primary-600 group flex gap-3 rounded-xl transition-colors py-2 px-4 text-base leading-6 font-bold"
                        >
                          <item.icon
                            className="mx-4 h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.text}
                        </Link>
                      </li>
                    )
                )}
                <li className="mt-8">
                  <ButtonSignOut />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={toggleMenu}
        className="bg-slate-100 text-primary-600 fixed bottom-6 right-4 p-2 text-lg rounded-full z-50 ring-primary-600 ring-1 lg:hidden"
      >
        {showMenu ? <RiCloseLine/> : <RiMenu3Fill/>}
      </button>
    </>
  );
}
