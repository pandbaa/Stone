import { useGameStore } from "../../../../store/game/game.store";
import { useSelectAttacker } from "../../../../store/game/select-attacker";

export function useEnemyTarget() {
  const { attackCard, attackHero, currentTurn } = useGameStore();
  const { cardAttackerId, setCardAttackerId } = useSelectAttacker();

  const handleSelectTarget = (targetId?: string, isHero = false) => {
    if (!cardAttackerId) return;
    if (currentTurn !== "player") return;

    if (isHero) {
      attackHero(cardAttackerId);
    } else if (targetId) {
      attackCard(cardAttackerId, targetId, "player");
    }
    setCardAttackerId(null);
  };

  return { handleSelectTarget };
}
