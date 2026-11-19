import { useGameStore } from "../../../store/game/game.store";
import { HandCard } from "./HandCard";
import { PlayerInfo } from "./player-info/PlayerInfo";
import { GridBoardCards } from "./board-card/GridBoardCards";
import { PlayerMana } from "./player-info/mana/PlayerMana";
import { MAX_MANA } from "../../../constants/game/core.constants";
import { AudioPlayer } from "./AudioPlayer";
import { EndTurnButton } from "./EndTurnButton";
import { SectionSide } from "./SectionSide";

export function GameBoard() {
  const { player, opponent, playCard } = useGameStore();

  return (
    <div className="h-screen w-full relative">
      <SectionSide isPlayer={false}>
        <div>
          <PlayerInfo player={opponent} typePlayer="opponent" />
          <PlayerMana
            currentMana={opponent.mana}
            maxMana={MAX_MANA}
            typePlayer="opponent"
          />
          <div className="-top-10 absolute w-full">
            <div className="flex items-center justify-center">
              {opponent.deck
                .filter((card) => card.isOnHand)
                .map((card, index, array) => (
                  <HandCard
                    card={card}
                    isHided
                    arrayLen={array.length}
                    index={index}
                    key={card.id}
                  />
                ))}
            </div>
          </div>
        </div>
        <GridBoardCards deck={opponent.deck} isPlayer={false} />
      </SectionSide>

      <div className="absolute top-[50vh] left-0 w-full">
        <hr className="opacity-20 border-#04465F w-11/12" />
        <EndTurnButton />
      </div>

      <SectionSide isPlayer={true}>
        <GridBoardCards deck={player.deck} isPlayer={true} />
        <PlayerInfo player={player} typePlayer="player" />
        <PlayerMana
          currentMana={player.mana}
          maxMana={MAX_MANA}
          typePlayer="player"
        />
        <AudioPlayer />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex items-center justify-center">
            {player.deck
              .filter((card) => card.isOnHand)
              .map((card, index, array) => (
                <HandCard
                  card={card}
                  arrayLen={array.length}
                  index={index}
                  key={card.id}
                  onClick={() => playCard(card.id)}
                  isDisabled={player.mana < card.mana}
                />
              ))}
          </div>
        </div>
      </SectionSide>
    </div>
  );
}
