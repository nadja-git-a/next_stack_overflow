"use client";

import Link from "next/link";

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
          <Link
            href="/home"
            onClick={onClose}
            className="
          rounded px-2 py-2
          text-fg
          transition
          hover:bg-primary-50
        "
          >
            Home
          </Link>

          <Link
            href="/myAccount"
            onClick={onClose}
            className="
          rounded px-2 py-2
          text-fg
          transition
          hover:bg-primary-50
        "
          >
            My Account
          </Link>

          <Link
            href="/mySnippets"
            onClick={onClose}
            className="
          rounded px-2 py-2
          text-fg
          transition
          hover:bg-primary-50
        "
          >
            My Snippets
          </Link>

          <Link
            href="/create"
            onClick={onClose}
            className="
          rounded px-2 py-2
          text-fg
          transition
          hover:bg-primary-50
        "
          >
            Create snippet
          </Link>
        </nav>
      </aside>
    </>
  );
}
