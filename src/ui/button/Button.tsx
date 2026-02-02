import { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  isPending?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function Button({
  isPending,
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isPending}
      onClick={onClick}
      className={`
        inline-flex w-fit items-center justify-center
        rounded-md
        text-sm font-medium
        bg-primary text-white
        transition
        hover:bg-primary-600
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary
        mr-4
        ${className}
      `}
    >
      {children}
    </button>
  );
}
