"use client";

import { MenuIcon } from "@/public/icons/MenuIcon";
import { useState } from "react";
import { Drawer } from "../drawer/Drawer";

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center px-4 py-2 border-b border-border bg-bg">
      <button
        aria-label="menu"
        onClick={() => setOpen((prev) => !prev)}
        className="
      mr-4
      inline-flex
      items-center
      justify-center
      rounded-md
      p-2
      bg-primary
      text-white
      transition
      hover:bg-primary-600
      focus:outline-none
      focus:ring-2
      focus:ring-primary
    "
      >
        <MenuIcon />
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
