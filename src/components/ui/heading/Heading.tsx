import type { PropsWithChildren } from "react";

export function Heading({children}: PropsWithChildren) {
  return <h1 className="w-2/3 text-5xl font-bold text-white text-center text-shadow-[8px_8px_4px_rgba(0,0,0,0.8)]">{children}</h1>
}