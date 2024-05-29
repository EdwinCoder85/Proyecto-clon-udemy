"use client"

import React from "react";
import { Button } from "./ui";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export default function ButtonSignOut() {
  return (
    <Button
      className="flex items-center gap-x-2 px-3 py-2"
      onClick={() => {
        signOut();
      }}
    >
      <FaSignOutAlt />
      Cerrar Sesion
    </Button>
  );
}
