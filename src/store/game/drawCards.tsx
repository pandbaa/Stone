import { MAX_HAND_CARDS } from "../../constants/game/core.constants";
import type { IGameCard, IGameStore } from "./game.types";

export const drawCardAction = (state: IGameStore) => {
  const currentPlayer =
    state.currentTurn === "player" ? state.player : state.opponent;
  const cardsOnHand = currentPlayer.deck.filter((card) => card.isOnHand).length;
  const cardsNeeded = MAX_HAND_CARDS - cardsOnHand;

  let drawnCards = 0;
  const updateDeck = currentPlayer.deck.map((card: IGameCard) => {
    if (!card.isTaken && !card.isOnHand && drawnCards < cardsNeeded) {
      drawnCards++;
      return { ...card, isTaken: true, isOnHand: true };
    }
    return card;
  });

  return {updateDeck}
};
