import Link from "next/link";
import { ReactNode } from "react";

export function NavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className=" rounded px-2 py-2
          text-fg
          transition
          hover:bg-primary-50"
    >
      {children}
    </Link>
  );
}
