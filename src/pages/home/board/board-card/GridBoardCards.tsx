import type { IGameCard } from "../../../../store/game/game.types";
import { BoardCard } from "./BoardCard";
import cn from 'clsx'

interface Props {
  deck: IGameCard[];
}

export function GridBoardCards({ deck }: Props) {
  return (
    <div className="h-56 px-10 flex items-start justify-center gap-1">
      {deck
        .filter((card) => card.isOnBoard)
        .map((card) => (
          <BoardCard key={card.id} card={card} />
        ))}
    </div>
  );
}
