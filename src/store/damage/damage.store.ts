import { create } from "zustand";

interface IDamageStore {
  damages: {
    [key: string]: number;
    player: number;
    opponent: number;
  };
  addDamage: (cardId: string, damage: number) => void;
}

export const useDamageStore = create<IDamageStore>((set) => ({
  damages: {
    player: 0,
    opponent: 0,
  },
  addDamage: (cardId, damage) => {
    set((state) => ({
      damages: {
        ...state.damages,
        [cardId]: damage,
      },
    }));
  },
}));
