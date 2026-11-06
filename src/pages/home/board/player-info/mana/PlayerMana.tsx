import { Badge } from "../../../../../components/ui/Badge";
import type { TPlayer } from "../../../../../store/game/game.types";
import cn from "clsx";

interface Props {
  currentMana: number;
  maxMana: number;
  typePlayer: TPlayer
}

export function PlayerMana({ currentMana, maxMana, typePlayer }: Props) {
  const isPlayer = typePlayer === 'player'
  return (
    <div className={cn("flex items-center absolute", {
      "right-3 bottom-4" : isPlayer,
      "left-3 top-4" : !isPlayer
    })}>
      <Badge value={currentMana} maxValue={maxMana} color="blue" />
      <div className="flex items-center ml-2">
        {new Array(maxMana).fill(0).map((_, index) => (
          <div
            className="w-6 h-6 bg-gradient-to-b from-[#12087D] to-[#2E79FD] rounded-full mx-1 shadow-inner shadow-xl"
            key={index}
            style={{ opacity: index < currentMana ? 1 : 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
