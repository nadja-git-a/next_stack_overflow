"use client";

import { NavLink } from "../links/NavLink";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function Drawer({ open, onClose }: DrawerProps) {
  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh w-72",
          "bg-bg text-fg shadow-lg border-r border-border",
          "transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-2 p-4">
          <NavLink href="/home" onClick={onClose}>
            Home
          </NavLink>

          <NavLink href="/myAccount" onClick={onClose}>
            My Account
          </NavLink>

          <NavLink href="/mySnippets" onClick={onClose}>
            My Snippets
          </NavLink>

          <NavLink href="/create" onClick={onClose}>
            Create Snippet
          </NavLink>

          <NavLink href="/users" onClick={onClose}>
            Users
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
