import { Button } from "../../components/ui/button/Button";
import { Heading } from "../../components/ui/heading/Heading";
import { useGameStore } from "../../store/game/game.store";

export function WelcomeScreen() {
  const { startGame, isGameStarted } = useGameStore();
  return (
    <div className="flex items-center flex-col gap-4 justify-center h-screen">
      <Heading>ХРОНИКИ ЗАБЫТОГО ГОРОДА</Heading>
      <Button onClick={startGame}>Начать игру</Button>
    </div>
  );
}
