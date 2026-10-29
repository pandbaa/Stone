import { useGameStore } from "../../../store/game/game.store";
import { HandCard } from "./HandCard";
import { PlayerInfo } from "./PlayerInfo";
import { GridBoardCards } from "./board-card/GridBoardCards";

export function GameBoard() {
  const { player, opponent, playCard, endTurn, currentTurn } = useGameStore();

  return (
    <div
      className="h-screen w-full relative grid"
      style={{
        gridTemplateRows: "1fr 0.01fr 1fr",
      }}
    >
      <section>
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <div className="-top-10 absolute w-full">
            <div className="flex items-center justify-center">
              {opponent.deck
                .filter((card) => !card.isOnBoard)
                .slice(0, 6)
                .map((card, index, array) => (
                  <HandCard
                    card={card}
                    isHided
                    arrayLen={array.length}
                    index={index}
                    key={card.id}
                    onClick={() => playCard(card.id)}
                  ></HandCard>
                ))}
            </div>
          </div>
        </div>
        <GridBoardCards deck={opponent.deck} />
      </section>
      <hr className="opacity-20 border-#04465F"/>
      <section>
        <GridBoardCards deck={player.deck} />
        <PlayerInfo player={player} typePlayer="player" />
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex items-center justify-center">
            {player.deck
              .filter((card) => !card.isOnBoard)
              .slice(0, 6)
              .map((card, index, array) => (
                <HandCard
                  card={card}
                  arrayLen={array.length}
                  index={index}
                  key={card.id}
                  onClick={() => playCard(card.id)}
                ></HandCard>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
