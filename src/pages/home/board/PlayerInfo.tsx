import type { IHero, TPlayer } from "../../../store/game/game.types";
import cn from "clsx"

interface Props {
  player: Omit<IHero, "deck">
  typePlayer: TPlayer
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const isPlayer = typePlayer === 'player'
  return (
    <div className={cn(
        "absolute left-0 z-20 px-3",
        isPlayer ? "bottom-4" : "top-4",
      )}>
      <h1>{isPlayer ? "Игрок" : "Оппонент"}</h1>
      <p>HP: {player.health}</p>
      <p>Mana: {player.mana}</p>
    </div>
  );
}
