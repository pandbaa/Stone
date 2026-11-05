import type { ButtonHTMLAttributes } from "react";
import cn from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  variant = "primary",
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        "button",
        variant === "secondary" && "secondary",
        className,
      )}
    >
      {children}
    </button>
  );
}
