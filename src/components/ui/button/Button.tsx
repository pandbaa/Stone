import type { HTMLAttributes } from "react";
import cn from "clsx";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", ...rest }: Props) {
  return (
    <button
      className={cn("button", rest.className)}
      {...rest}
    >{children}
    </button>
  );
}
