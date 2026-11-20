import { useGameStore } from "../../store/game/game.store";
import { GameBoard } from "./board/GameBoard";
import { WelcomeScreen } from "./WelcomeScreen";
import { Notification } from "../../components/ui/notification/Notification";

function Home() {
  const { isGameStarted, isGameOver } = useGameStore();
  
  return (
    <main>
      <Notification />
      {isGameStarted ? <GameBoard /> : <WelcomeScreen />}
    </main>
  );
}

export default Home;
