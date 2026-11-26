import type { ICard } from "../../types/card.types";

export type TPlayer = "player" | "opponent";

export interface IGameCard extends ICard {
  id: string;
  isOnBoard: boolean;
  isOnHand: boolean;
  isCanAttack: boolean;
  isTaken: boolean;
  isPlayedThisTurn: boolean;
}

export interface IHero {
  health: number;
  mana: number;
  deck: IGameCard[];
}

export interface IGameFnStore {
  startGame: () => void;
  endTurn: () => void;
  playCard: (cardId: string) => void;
  attackCard: (
    attacherId: string,
    targetId: string,
    attackerType: TPlayer,
  ) => void;
  attackHero: (attacherId: string) => void;
  returnCard: (cardId: string) => void;
}

export interface IGameStore extends IGameFnStore {
  isGameStarted: boolean;
  player: IHero;
  opponent: IHero;
  currentTurn: TPlayer;
  isGameOver: boolean;
  turn: number;
}
