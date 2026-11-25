import type { IGameCard } from "../../../../store/game/game.types";
import { motion } from "framer-motion";
import cn from "clsx";
import { useGameStore } from "../../../../store/game/game.store";
import { useEnemyTarget } from "./useEnemyTarget";
import { useSelectAttacker } from "../../../../store/game/select-attacker";

interface Props {
  card: IGameCard;
  isPlayer: boolean;
}

export function BoardCard({ card, isPlayer }: Props) {
  const { returnCard, currentTurn } = useGameStore();
  const { handleSelectTarget } = useEnemyTarget();
  const { setCardAttackerId, cardAttackerId } = useSelectAttacker();

  const handleClick = (cardId: number) => {
    if (currentTurn !== "player") return;

    console.log(card.isPlayedThisTurn)
    if (isPlayer) {
      if (card.isCanAttack) {
        setCardAttackerId(cardId);
      } else if (card.isPlayedThisTurn) {
        returnCard(cardId);
      }
    } else {
      handleSelectTarget(cardId);
    }
  };

  const isPlayerSelectAttacker = isPlayer && cardAttackerId === card.id;
  return (
    <motion.button
      className={cn("h-34 w-24 shadow-2xl mx-1", {
        "border-2 cursor-pointer border-[#1D9942]":
          card.isCanAttack &&
          !isPlayerSelectAttacker &&
          isPlayer &&
          currentTurn === "player",
        "border-2 border-[#C7C40F]": isPlayerSelectAttacker,
        "border-2 border-[#C90819]": !isPlayer && cardAttackerId,
        "cursor-default": currentTurn!=='player'
      })}
      initial={{ scale: 0.9, rotate: -15, y: 100, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
      transition={{
        type: "spring" as const,
        stiffness: 150,
        damping: 20,
        mass: 2,
      }}
      onClick={() => currentTurn!=='player' ? null: handleClick(card.id)}
    >
      <img src={card.imageUrl} alt={card.name} />
    </motion.button>
  );
}
