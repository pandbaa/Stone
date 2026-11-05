import cn from "clsx";

interface Props {
  value: number;
  maxValue: number;
  color: "green" | "red";
}

export function Badge({ value, maxValue, color }: Props) {
  return (
    <div
      className={cn("py-1 px-5 rounded-2xl shadow-lg w-18", {
        "bg-gradient-to-b from-[#69040D] to-[#C90819]": color === "red",
        "bg-gradient-to-b from-[#0E662D] to-[#148C3E]": color === "green",
      })}
    >
      {value}/{maxValue}
    </div>
  );
}
