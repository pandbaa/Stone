import type { CSSProperties } from "react";
import type { ICard } from "../../../types/card.types";
import cn from "clsx";
import { motion } from "framer-motion";
import type { MotionProps } from "framer-motion";

interface Props {
  card: ICard;
  onClick: () => void;
  isDisabled?: boolean;
  isHided?: boolean;
  index: number;
  arrayLen: number;
}

export function HandCard({
  card,
  onClick,
  isDisabled,
  isHided,
  index,
  arrayLen,
}: Props) {

  const getStyleRotation = (
    index: number,
    total: number,
    isPlayer?: boolean,
  ) => {
    const middle = (total - 1) / 2;
    const rotate = (index - middle) * 10 * (isPlayer ? 1 : -1);
    const translateY =
      Math.pow(Math.abs(index - middle), 2) * 7 * (isPlayer ? 1 : -1);

    return {
      initial: { scale: 1, y: 0, zIndex: 0, rotate: 0 },
      animate: { rotate, y: translateY },
      whileHover: isPlayer ? {scale: 1.2, zIndex: 10, y: translateY - 105} : {},
      transition: { type: "spring" as const, stiffness: 300, damping: 40 },
    };
  };

  return (
    <motion.button
      className={cn(
        "h-26 w-18 inline-block -ml-5 rounded-lg cursor-pointer will-change-transform",
        {
          "opacity-50": isDisabled,
        },
      )}
      onClick={onClick}
      disabled={isDisabled}
      {...getStyleRotation(index, arrayLen, !isHided)}
    >
      <img
        src={isHided ? "../../../../img/Cards/cardback.png" : card.imageUrl}
        alt={card.name}
      />
    </motion.button>
  );
}
