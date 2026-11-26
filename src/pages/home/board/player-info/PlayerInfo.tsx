import type { IHero, TPlayer } from "../../../../store/game/game.types";
import cn from "clsx";
import { Badge } from "../../../../components/ui/Badge";
import { MAX_HP } from "../../../../constants/game/core.constants";
import { useEnemyTarget } from "../board-card/useEnemyTarget";
import { useGameStore } from "../../../../store/game/game.store";
import { useSelectAttacker } from "../../../../store/game/select-attacker";
import { DamageList } from "../../DamageList";

interface Props {
  player: Omit<IHero, "deck">;
  typePlayer: TPlayer;
}

export function PlayerInfo({ player, typePlayer }: Props) {
  const { handleSelectTarget } = useEnemyTarget();
  const { currentTurn, opponent } = useGameStore();
  const { cardAttackerId } = useSelectAttacker();

  const opponentTaunt = opponent.deck.find(
    (card) => card.type === "taunt" && card.isOnBoard,
  );
  const isPlayer = typePlayer === "player";

  return (
    <button
      className={cn("absolute z-20 px-1 border-2 border-transparent", {
        "bottom-1.5 left-0": isPlayer,
        "top-3 right-0": !isPlayer,
        "cursor-pointer": !isPlayer && currentTurn === "player",
        "!border-[#C90819] rounded-lg":
          !isPlayer && cardAttackerId && !opponentTaunt,
      })}
      disabled={isPlayer || currentTurn === "opponent"}
      onClick={() => (isPlayer ? null : handleSelectTarget(undefined, true))}
    >
      <img
        width={150}
        className="drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
        src={
          isPlayer
            ? "../../../../../img/Heroes/Player.png"
            : "../../../../../img/Heroes/Opponent.png"
        }
        alt={typePlayer}
      />
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-3/4">
        <Badge value={player.health} maxValue={MAX_HP} color="red" />
      </div>
      <DamageList id={typePlayer} isRight={isPlayer} />
    </button>
  );
}
