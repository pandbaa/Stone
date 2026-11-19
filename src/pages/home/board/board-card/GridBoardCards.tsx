import type { IGameCard } from "../../../../store/game/game.types";
import { BoardCard } from "./BoardCard";
import cn from 'clsx'

interface Props {
  deck: IGameCard[];
  isPlayer: boolean
}

export function GridBoardCards({ deck, isPlayer }: Props) {
  return (
    <div className={cn("h-56 px-10 flex justify-center gap-1",{
      'items-start': isPlayer,
      'items-end': !isPlayer
    })}>
      {deck
        .filter((card) => card.isOnBoard)
        .map((card) => (
          <BoardCard key={card.id} card={card} isPlayer={isPlayer}/>
        ))}
    </div>
  );
}
