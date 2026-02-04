"use client";

import { useState } from "react";
import { Drawer } from "../drawer/Drawer";
import { Button } from "../button/Button";

import MenuIcon from "@/public/icons/menu.svg";

export function Menu() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex items-center px-4 py-2 border-b border-border bg-bg">
      <Button
        aria-label="menu"
        className="px-1 py-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon className="size-6" />
      </Button>

      <Drawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
