"use client";

import { useState } from "react";
import { Drawer } from "../drawer/Drawer";
import { Button } from "../button/Button";

export function Menu() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center px-4 py-2 border-b border-border bg-bg">
      <Button
        aria-label="menu"
        className="px-1 py-1"
        onClick={() => setOpen((prev) => !prev)}
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
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
