import cn from "clsx";

interface Props {
  value: number;
  maxValue: number;
  color: "blue" | "red";
}

export function Badge({ value, maxValue, color }: Props) {
  return (
    <div
      className={cn("py-1 px-5 rounded-2xl shadow-lg w-18", {
        "bg-gradient-to-b from-[#69040D] to-[#C90819]": color === "red",
        "bg-gradient-to-b from-[#12087D] to-[#2E79FD]": color === "blue",
      })}
    >
      {value}/{maxValue}
    </div>
  );
}
