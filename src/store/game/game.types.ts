import type { ICard } from "../../types/card.types";

export type TPlayer = "player" | "opponent";

export interface IGameCard extends ICard {
  id: number;
  isOnBoard: boolean;
  isOnHand: boolean;
  isCanAttack: boolean;
  isTaken: boolean;
}

export interface IHero {
  health: number;
  mana: number;
  deck: IGameCard[]
}

export interface IGameFnStore {
  startGame: () => void;
  endTurn: () => void;
  playCard: (cardId: number) => void;
  attackCard: (
    attacherId: number,
    targetId: number,
    attackerType: TPlayer,
  ) => void;
  attackHero: (attacherId: number) => void;
  returnCard: (cardId: number) => void;
}

export interface IGameStore extends IGameFnStore {
  isGameStarted: boolean;
  player: IHero;
  opponent: IHero;
  currentTurn: TPlayer;
  isGameOver: boolean;
  turn: number
}
