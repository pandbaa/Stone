import type { ICard } from "../../types/card.types";

export type TPlayer = "player" | "opponent";

export interface IGameCard extends ICard {
  id: number;
  isOnBoard: boolean;
  isCanAttack: boolean;
}

export interface IHero {
  deck: IGameCard[];
  health: number;
  mana: number;
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
  resetGameOver: () => void;
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
