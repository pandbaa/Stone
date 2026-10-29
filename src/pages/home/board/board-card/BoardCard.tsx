import type { ICard } from "../../../../types/card.types";
import { motion, scale } from "framer-motion";

interface Props {
  card: ICard;
}

export function BoardCard({ card }: Props) {
  return (
    <motion.button
      className="h-34 w-24 shadow-2xl mx-1 rounded-lg"
      initial={{ scale: 0.9, rotate: -15, y: 100, opacity: 0}}
      animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 150, damping: 20, mass:2 }}
    >
      <img src={card.imageUrl} alt={card.name} />
    </motion.button>
  );
}
