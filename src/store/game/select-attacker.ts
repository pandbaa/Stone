import { create } from "zustand";

interface IUseSelectAttacker {
  cardAttackerId: number | null
  setCardAttackerId: (cardId: number | null)=>void
}

export const useSelectAttacker = create<IUseSelectAttacker>((set)=>({
  cardAttackerId: null,
  setCardAttackerId: cardId=>set({cardAttackerId: cardId})
}))