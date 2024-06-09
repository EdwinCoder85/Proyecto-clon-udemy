"use client";

import React, { useState } from "react";
import { RiCloseLine, RiMenu3Fill } from "react-icons/ri";

export default function ButtonMobile() {
  const [showMenu, setShowMenu] = useState(false);

  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <button
      type="button"
      onClick={toogleMenu}
      className="bg-primary-600 text-white fixed bottom-8 right-6 p-2 text-lg rounded-full z-40"
    >
      {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
    </button>
  );
}
