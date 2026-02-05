import { ReactNode, MouseEventHandler } from "react";

type RoundButtonProps = {
  isDisabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export function RoundButton({
  isDisabled,
  children,
  onClick,
  className = "",
}: RoundButtonProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      className={`
      inline-flex h-10 w-10 items-center justify-center rounded-full
      border border-border
      text-primary
      transition
      hover:bg-primary-50
      disabled:cursor-not-allowed
      disabled:opacity-40
        ${className}
      `}
    >
      {children}
    </button>
  );
}
