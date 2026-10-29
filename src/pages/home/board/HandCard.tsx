import type { CSSProperties } from "react";
import { useState } from "react";
import type { ICard } from "../../../types/card.types";
import cn from "clsx";
import { motion } from "framer-motion";

interface Props {
  card: ICard;
  onClick: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  style?: CSSProperties;
}

export function HandCard({ card, onClick, isDisabled, isHided, style }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.button
      className={cn("h-24 w-20 inline-block -ml-5 rounded-lg cursor-pointer will-change-transform", {
        "bg-white": isHided,
        "opacity-50": isDisabled,
      })}
      style={style}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 1, y: 0, zIndex: 0 }}
      animate={
        isHovered && !isHided
          ? { scale: 1.2, zIndex: 10, y: -105 }
          : { scale: 1, y: 0, zIndex: 0 }
      }
      transition={{ type: "spring", stiffness: 210, damping: 40 }}
    >
      {!isHided && <img src={card.imageUrl} alt={card.name} />}
    </motion.button>
  );
}
