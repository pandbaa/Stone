import { useGameStore } from "../../store/game/game.store";
import { GameBoard } from "./board/GameBoard";
import { WelcomeScreen } from "./WelcomeScreen";
import { Notification } from "../../components/ui/notification/Notification";
import { useEffect } from "react";

function Home() {
  const { isGameStarted, isGameOver, resetGameOver } = useGameStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      resetGameOver();
    }, 3500);

    return ()=> {
      clearTimeout(timeout)
    }
  }, [resetGameOver]);

  return (
    <main>
      {isGameOver && <Notification>Игра завершена! Вы победили!</Notification>}
      {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
    </main>
  );
}

export default Home;
