import { useGameStore } from "../../../store/game/game.store";
import { HandCard } from "./HandCard";
import { PlayerInfo } from "./PlayerInfo";

export function GameBoard() {
  const { player, opponent, playCard, endTurn, currentTurn } = useGameStore();

  const calculateRotationOpponent = (index: number, total: number) => {
    const middle = (total - 1) / 2;
    return -(index - middle) * 10;
  };

  const calculateRotation = (index: number, total: number) => {
    const middle = (total - 1) / 2;
    return (index - middle) * 10;
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between overflow-hidden">
      <div className="relative">
        <PlayerInfo player={opponent} typePlayer="opponent" />
        <div className="flex items-center justify-center -mt-4">
          {opponent.deck
            .filter((card) => !card.isOnBoard)
            .slice(0, 6)
            .map((card, index, array) => (
              <HandCard
                card={card}
                isHided
                style={{
                  transform: `rotate(${calculateRotationOpponent(index, array.length)}deg)`,
                }}
                key={card.id}
                onClick={() => playCard(card.id)}
              ></HandCard>
            ))}
        </div>
      </div>

      <section>
        <div className="h-37">
          {opponent.deck
            .filter((card) => card.isOnBoard)
            .map((card) => (
              <button
                className="h-54 w-36 bg-white inline-block mx-1 rounded-lg"
                key={card.id}
              >
                <img src={card.imageUrl} alt={card.name} />
              </button>
            ))}
        </div>

        <hr />

        <div className="h-37">
          {player.deck
            .filter((card) => card.isOnBoard)
            .map((card) => (
              <button
                className="h-54 w-36 bg-white inline-block mx-1 rounded-lg"
                key={card.id}
              >
                <img src={card.imageUrl} alt={card.name} />
              </button>
            ))}
        </div>
      </section>

      <div className="relative">
        <PlayerInfo player={player} typePlayer="player" />
        <div className="flex items-center justify-center -mb-6">
          {player.deck
            .filter((card) => !card.isOnBoard)
            .slice(0, 6)
            .map((card, index, array) => (
              <HandCard
                card={card}
                style={{
                  transform: `rotate(${calculateRotation(index, array.length)}deg)`,
                }}
                key={card.id}
                onClick={() => playCard(card.id)}
              ></HandCard>
            ))}
        </div>
      </div>
    </div>
  );
}
