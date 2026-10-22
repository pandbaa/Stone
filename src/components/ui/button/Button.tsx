import type { HTMLAttributes } from "react";
import cn from "clsx";
import { Settings } from "lucide-react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", ...rest }: Props) {
  return (
    <button
      className={cn("button secondary", rest.className)}
      {...rest}
    >
      <Settings/>
    </button>
  );
}
