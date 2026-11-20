import { CARDS } from "../../constants/game/cards.constants";
import { MAX_HAND_CARDS, MAX_MANA } from "../../constants/game/core.constants";
import type {
  IGameCard,
  IGameStore,
  TPlayer,
  IHero,
  IGameFnStore,
} from "./game.types";
import { create } from "zustand";
import shuffle from "lodash/shuffle";
import { drawCardAction } from "./drawCards";
import { useNotificationStore } from "../notification/notification.store";

export function createDeck(): IGameCard[] {
  return CARDS.map((card, index) => ({
    ...card,
    id: index + 1,
    isTaken: false,
    isOnBoard: false,
    isOnHand: false,
    isCanAttack: false,
  }));
}

const initialGameData: Omit<IGameStore, keyof IGameFnStore> = {
  player: {
    deck: [],
    health: 25,
    mana: 10,
  },
  opponent: {
    deck: [],
    health: 25,
    mana: 1,
  },
  currentTurn: "player",
  isGameOver: false,
  isGameStarted: true,
  turn: 1,
};

const getNewMana = (newTurn: TPlayer, currentTurn: number) => {
  return newTurn === "player" ? Math.min(currentTurn, MAX_MANA) : currentTurn;
};

const updateAttack = (deck: IGameCard[]) =>
  deck.map((card) => ({
    ...card,
    isCanAttack: card.isOnBoard,
  }));
const getCardById = (cardId: number, deck: IGameCard[]) =>
  deck.find((card) => card.id === cardId);

const useGameStore = create<IGameStore>((set, get) => ({
  ...initialGameData,
  isGameStarted: false,
  startGame: () => {
    const deck = createDeck();
    const playerInitialDeck = shuffle(deck);
    const opponentInitialDeck = shuffle(deck);

    set({
      ...initialGameData,
      player: {
        ...initialGameData.player,
        deck: playerInitialDeck.map((card, index) => ({
          ...card,
          isOnHand: index < MAX_HAND_CARDS,
          isTaken: index < MAX_HAND_CARDS,
        })),
      },
      opponent: {
        ...initialGameData.opponent,
        deck: opponentInitialDeck.map((card, index) => ({
          ...card,
          isOnHand: index < MAX_HAND_CARDS,
          isTaken: index < MAX_HAND_CARDS,
        })),
      },
    });
  },
  endTurn: () => {
    const state = get();
    const newTurn: TPlayer =
      state.currentTurn === "player" ? "opponent" : "player";
    const newPlayerMana = getNewMana("player", state.turn);
    const newOpponentMana = getNewMana("opponent", state.turn);

    if (newTurn === "player") {
      useNotificationStore.getState().show("Твой ход");
    }

    const newState = {
      turn: state.turn + 1,
      currentTurn: newTurn,
      player: {
        ...state.player,
        mana: newPlayerMana,
        deck: updateAttack(
          newTurn === "player"
            ? drawCardAction(state).updateDeck
            : state.player.deck,
        ),
      },
      opponent: {
        ...state.opponent,
        mana: newOpponentMana,
        deck: updateAttack(
          newTurn === "opponent"
            ? drawCardAction(state).updateDeck
            : state.opponent.deck,
        ),
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
        card.id === cardId
          ? { ...card, isOnBoard: true, isOnHand: false }
          : card,
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
        isAttackerPlayer ? state.player.deck : state.opponent.deck,
      );
      const opponentTaunt = isAttackerPlayer
        ? state.opponent.deck.find(
            (card) => card.type === "taunt" && card.isOnBoard,
          )
        : state.player.deck.find(
            (card) => card.type === "taunt" && card.isOnBoard,
          );

      if (attacker && attacker.isCanAttack && !opponentTaunt) {
        const opponent = state[isAttackerPlayer ? "opponent" : "player"];
        opponent.health -= attacker.attack;
        attacker.isCanAttack = false;
        if (opponent.health <= 0) {
          state.isGameOver = true;
          state.isGameStarted = false;

          useNotificationStore.getState().show(isAttackerPlayer ? 'Ты выйграл!' : "Ты проиграл", isAttackerPlayer ? 'win' : 'lose')
        }
      }

      return {
        player: state.player,
        opponent: state.opponent,
        isGameOver: state.isGameOver,
        isGameStarted: state.isGameStarted,
      };
    });
  },
  returnCard: (cardId: number) => {
    const state = get();
    const isPlayerTurn = state.currentTurn === "player";
    const currentPlayer = isPlayerTurn ? state.player : state.opponent;
    const currentCard = currentPlayer.deck.find((card) => card.id === cardId);

    if (!currentCard || !currentCard.isOnBoard) return;

    const updatedPlayer: IHero = {
      ...currentPlayer,
      mana: currentPlayer.mana + currentCard.mana,
      deck: currentPlayer.deck.map((card) =>
        card.id === cardId
          ? { ...card, isOnBoard: false, isOnHand: true }
          : card,
      ),
    };

    set(isPlayerTurn ? { player: updatedPlayer } : { opponent: updatedPlayer });
  },
}));

export { useGameStore };
