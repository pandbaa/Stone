import type { IHero, TPlayer } from "../../../../store/game/game.types";
import cn from "clsx";
import { Badge } from "../../../../components/ui/Badge";
import { MAX_HP, MAX_MANA } from "../../../../constants/game/core.constants";

interface Props {
  player: Omit<IHero, "deck">;
  typePlayer: TPlayer;
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const isPlayer = typePlayer === "player";
  return (
    <div
      className={cn("absolute z-20 px-1", {
        "bottom-1.5 left-0": isPlayer,
        "top-3 right-0": !isPlayer,
      })}
    >
      <img
        width={150}
        src={
          isPlayer
            ? "../../../../../img/Heroes/Player.png"
            : "../../../../../img/Heroes/Opponent.png"
        }
        alt={typePlayer}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3/4">
        <Badge value={player.health} maxValue={MAX_HP} color="red" />
      </div>
    </div>
  );
}
