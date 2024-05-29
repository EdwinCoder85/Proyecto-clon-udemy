"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const solutions = [
  {
    name: "Suscripciones",
    description: "Escoje tu plan",
    href: "/subscriptions",
    icon: MdSubscriptions,
    onClick: () => {},
  },
  {
    name: "Cerrar Sesión",
    description: "",
    href: "/",
    icon: FaSignOutAlt,
    onClick: () => signOut(),
  },
];

export function MyPopover({ session }: any) {

  return (
    <div className="w-full max-w-sm z-50">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
            ${open ? "text-white" : "text-white/90"}
            group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 rounded-full`}
              style={{ width: "2.5rem", height: "2.5rem" }} // Establecemos el mismo ancho y alto para que sea circular
            >
              <Image
                src={session.user.image}
                alt={session.user.username || session.user.name}
                width={1000}
                height={1000}
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/6 z-10 mt-3 w-screen max-w-sm -translate-x-1/6 transform px-4 sm:px-0 lg:max-w-60">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                  <div className="relative grid gap-8 bg-white p-5">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={item.onClick}
                        className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-primary-50 focus:outline-none focus-visible:ring focus-visible:ring-primary-500/50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary-600 text-white sm:h-12 sm:w-12">
                          <item.icon
                            className="mx-4 h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-primary-600 p-4">
                    <span className="flex items-center">
                      <span className="text-lg font-bold">
                        Course Programming
                      </span>
                    </span>
                    <span className="block text-sm text-gray-100">
                      Plataforma educativa práctica.
                    </span>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
