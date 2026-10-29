import type { CSSProperties } from "react";
import type { ICard } from "../../../types/card.types";
import cn from "clsx";

interface Props {
  card: ICard;
  onClick: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  style?: CSSProperties;
}

export function HandCard({ card, onClick, isDisabled, isHided, style }: Props) {
  return (
    <button
      className={cn("h-24 w-16 inline-block -ml-2 rounded-lg", {
        'bg-white': isHided,
        'opacity-50': isDisabled
      })}
      style={style}
      onClick={onClick}
      disabled={isDisabled}
    >
      {!isHided && <img src={card.imageUrl} alt={card.name} />}
    </button>
  );
}
