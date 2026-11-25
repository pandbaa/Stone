import { Button } from "../../../components/ui/button/Button";
import { useGameStore } from "../../../store/game/game.store";

export function EndTurnButton() {
  const { endTurn, currentTurn } = useGameStore();
  const isOpponentTurn = currentTurn === 'opponent'

  return (
    <Button
      variant="primary"
      onClick={endTurn}
      //onClick={isOpponentTurn ? ()=>null : endTurn}
      className="absolute right-2 z-10"
      //disabled={isOpponentTurn}
      style={{
        top: '-40px'
      }}
    >
      Конец хода
    </Button>
  );
}
