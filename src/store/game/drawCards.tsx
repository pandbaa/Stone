import { MAX_HAND_CARDS } from "../../constants/game/core.constants";
import type { IGameCard } from "./game.types";

export const drawCardAction = (deck: IGameCard[]): IGameCard[] => {
  const cardsOnHand = deck.filter((card) => card.isOnHand).length;
  const cardsNeeded = MAX_HAND_CARDS - cardsOnHand;

  let drawnCards = 0;

  return deck.map((card) => {
    if (!card.isTaken && drawnCards < cardsNeeded) {
      drawnCards++;

      return {
        ...card,
        isTaken: true,
        isOnHand: true,
      };
    }

    return card;
  });
};
