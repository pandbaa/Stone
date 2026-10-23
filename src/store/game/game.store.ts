import { CARDS } from "../../constants/game/cards.constants";
import type { IGameCard, IGameStore, TPlayer, IHero } from "./game.types";
import { create } from "zustand";

export function createDeck(): IGameCard[] {
  return CARDS.map((card, index) => ({
    ...card,
    id: index + 1,
    isOnBoard: false,
    isCanAttack: false,
  }));
}

const initialGameData = {
  player: {
    deck: createDeck(),
    health: 25,
    mana: 1,
  },
  opponent: {
    deck: createDeck(),
    health: 25,
    mana: 1,
  },
  currentTurn: "player",
  isGameOver: false,
};

const getNewMana = (newTurn: TPlayer, currentMana: number) => {
  return newTurn === "player" ? Math.min(currentMana + 1, 6) : currentMana;
};
const resetAttack = (deck: IGameCard[]) =>
  deck.map((card) => ({
    ...card,
    isCanAttack: card.isOnBoard,
  }));

const useGameStore = create<IGameStore>((set, get) => ({
  ...initialGameData,
  startGame: () => set(initialGameData),
  endTurn: () => {
    const state = get();
    const newTurn: TPlayer =
      state.currentTurn === "player" ? "opponent" : "player";
    const newPlayerMana = getNewMana("player", state.player.mana);
    const newOpponentMana = getNewMana("opponent", state.opponent.mana);
    const newState = {
      currentTurn: newTurn,
      player: {
        ...state.player,
        mana: newPlayerMana,
        deck: resetAttack(state.player.deck),
      },
      opponent: {
        ...state.opponent,
        mana: newOpponentMana,
        deck: resetAttack(state.opponent.deck),
      },
    };
    set(newState);
  },
  playCard: (cardId: number) => {
    const state = get();
    const isPlayerTurn = state.currentTurn === "player";
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;
    const currentCard = currentPlayer.deck.find((card) => card.id === cardId);

    if (!currentCard || currentPlayer.mana < currentCard.mana) return;

    const updatedPlayer: IHero = {
      ...currentPlayer,
      mana: currentPlayer.mana - currentCard.mana,
      deck: currentPlayer.deck.map((card) =>
        card.id === cardId ? { ...card, isOnBoard: true } : card,
      ),
    };

    set(isPlayerTurn ? { player: updatedPlayer } : { opponent: updatedPlayer });
  },
  attackCard: (attackerId: number, targetId: number) => {},
  attackHero: () => {},
}));
