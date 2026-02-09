import { ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  isDisabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "round";
};

const variants = {
  primary: `
    inline-flex w-fit items-center justify-center
    rounded-md
    text-sm font-medium
    bg-primary text-white
    transition
    hover:bg-primary-600
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-primary
    mr-4
  `,

  round: `
    inline-flex h-10 w-10 items-center justify-center rounded-full
    border border-border
    text-primary
    transition
    hover:bg-primary-50
    disabled:cursor-not-allowed
    disabled:opacity-40`,
};

export function Button({
  isDisabled,
  children,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={[variants[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
