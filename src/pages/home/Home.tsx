import { useGameStore } from "../../store/game/game.store";
import { GameBoard } from "./board/GameBoard";
import { WelcomeScreen } from "./WelcomeScreen";

function Home() {
  const { isGameStarted } = useGameStore();
  return <main>{isGameStarted ? <GameBoard /> : <WelcomeScreen />}</main>;
}

export default Home;
