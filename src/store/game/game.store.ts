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

const initialGameData: Pick<
  IGameStore,
  "player" | "opponent" | "currentTurn" | "isGameOver" | "isGameStarted"
> = {
  player: {
    deck: createDeck(),
    health: 25,
    mana: 100,
  },
  opponent: {
    deck: createDeck(),
    health: 25,
    mana: 100,
  },
  currentTurn: "player",
  isGameOver: false,
  isGameStarted: true,
};

const getNewMana = (newTurn: TPlayer, currentMana: number) => {
  return newTurn === "player" ? Math.min(currentMana + 1, 6) : currentMana;
};
const resetAttack = (deck: IGameCard[]) =>
  deck.map((card) => ({
    ...card,
    isCanAttack: card.isOnBoard,
  }));
const getCardById = (cardId: number, deck: IGameCard[]) =>
  deck.find((card) => card.id === cardId);

const useGameStore = create<IGameStore>((set, get) => ({
  ...initialGameData,
  isGameStarted: false,
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
  attackCard: (attackerId: number, targetId: number, attackerType: TPlayer) => {
    set((state) => {
      const isAttackerPlayer = attackerType === "player";

      const attackerDeck = isAttackerPlayer
        ? state.player.deck
        : state.opponent.deck;

      const targetDeck = isAttackerPlayer
        ? state.opponent.deck
        : state.player.deck;

      const attacker = getCardById(attackerId, attackerDeck);
      const target = getCardById(targetId, targetDeck);

      if (!attacker || !target || !attacker.isCanAttack) return state;

      const targetHealth = target.health - attacker.attack;

      const updatedAttackerDeck = attackerDeck.map((card) =>
        card.id === attackerId ? { ...card, isCanAttack: false } : card,
      );

      const updatedTargetDeck =
        targetHealth <= 0
          ? targetDeck.filter((card) => card.id !== targetId)
          : targetDeck.map((card) =>
              card.id === targetId ? { ...card, health: targetHealth } : card,
            );

      return {
        player: {
          ...state.player,
          deck: isAttackerPlayer ? updatedAttackerDeck : updatedTargetDeck,
        },
        opponent: {
          ...state.opponent,
          deck: isAttackerPlayer ? updatedTargetDeck : updatedAttackerDeck,
        },
      };
    });
  },
  attackHero: (attackerId: number) => {
    set((state) => {
      const isAttackerPlayer = state.currentTurn === "player";

      const attacker = getCardById(
        attackerId,
        isAttackerPlayer ? state.opponent.deck : state.player.deck,
      );
      const opponentTaunt = isAttackerPlayer
        ? state.opponent.deck.find((card) => card.type === "taunt")
        : state.player.deck.find((card) => card.type === "taunt");

      if (attacker && attacker.isCanAttack && !opponentTaunt) {
        const opponent = state[isAttackerPlayer ? "opponent" : "player"];
        opponent.health -= attacker.attack;
        attacker.isCanAttack = false;
        if (opponent.health <= 0) {
          state.isGameOver = true;
        }
      }

      return {
        player: state.player,
        opponent: state.opponent,
        isGameOver: state.isGameOver,
      };
    });
  },
}));

export { useGameStore };
