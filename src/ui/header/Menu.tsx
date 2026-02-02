"use client";

import { useState } from "react";
import { Drawer } from "../drawer/Drawer";

export function Menu() {
  const [open, setOpen] = useState<boolean>(false);

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
