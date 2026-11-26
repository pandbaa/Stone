import { AnimatePresence, motion } from "framer-motion";
import { useDamageStore } from "../../store/damage/damage.store";
import type { TPlayer } from "../../store/game/game.types";
import cn from "clsx";

interface Props {
  id: string | TPlayer;
  isRight: boolean;
}

export function DamageList({ id, isRight = true }: Props) {
  const { damages } = useDamageStore();

  return (
    <AnimatePresence>
      {damages[id] > 0 && (
        <motion.div
          initial={{ rotate: 0, y: 0, opacity: 1 }}
          animate={{ rotate: 15, y: 50, opacity: 0 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute top-0 z-30 w-full text-center font-bold text-xl",
            isRight ? "-right-[60%]" : "-left-[56%]",
          )}
        >
          -{damages[id]}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
