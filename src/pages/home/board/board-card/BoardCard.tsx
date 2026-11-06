import type { IGameCard } from "../../../../store/game/game.types";
import { motion } from "framer-motion";
import cn from "clsx";

interface Props {
  card: IGameCard;
}

export function BoardCard({ card }: Props) {
  return (
    <motion.button
      className={cn("h-34 w-24 shadow-2xl mx-1 border-2", {
        "cursor-pointer border-[#1D9942]": card.isCanAttack,
        "border-transparent": !card.isCanAttack,
      })}
      initial={{ scale: 0.9, rotate: -15, y: 100, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
      transition={{
        type: "spring" as const,
        stiffness: 150,
        damping: 20,
        mass: 2,
      }}
    >
      <img src={card.imageUrl} alt={card.name} />
    </motion.button>
  );
}
