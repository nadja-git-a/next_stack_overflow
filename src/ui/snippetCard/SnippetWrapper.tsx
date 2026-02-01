"use client";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface SnippetWrapper {
  children: ReactNode;
  id: number;
}

export function SnippetWrapper({ children, id }: SnippetWrapper) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`snippets/${id}`);
  };
  return (
    <div
      className="
  mb-4 w-[90%] cursor-pointer rounded-lg
  border border-border bg-bg
  shadow-sm transition hover:shadow-md
"
      onClick={() => handleClick(id)}
    >
      {children}
    </div>
  );
}
