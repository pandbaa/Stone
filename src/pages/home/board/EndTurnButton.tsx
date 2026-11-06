import { Button } from "../../../components/ui/button/Button";
import { useGameStore } from "../../../store/game/game.store";

export function EndTurnButton() {
  const {endTurn} = useGameStore()
  return <Button variant="primary" onClick={endTurn} className='absolute top-[45%] right-2 z-10'>
    Конец хода
  </Button >
}