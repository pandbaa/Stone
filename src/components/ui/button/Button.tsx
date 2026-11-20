import type { ButtonHTMLAttributes } from "react";
import cn from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  className,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        "button",
        variant === "secondary" && "secondary",
        disabled && "pointer-events-none", 
        className,
      )}
    >
      {children}
    </button>
  );
}
