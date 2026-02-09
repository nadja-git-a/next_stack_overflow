import { ReactNode } from "react";

export function IconButton({ children }: { children: ReactNode }) {
  return (
    <div
      className="
flex items-center gap-1
text-primary transition hover:text-primary-600"
    >
      {children}
    </div>
  );
}
