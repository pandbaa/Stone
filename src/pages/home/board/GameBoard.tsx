import { useGameStore } from "../../../store/game/game.store";

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
    <div>
      <p>Текущий ход: {currentTurn}</p>
      <button onClick={endTurn}>Закончить ход</button>
      <div>
        <div>
          <h1>Opponent</h1>
          <p>HP: {opponent.health}</p>
          <p>Mana: {opponent.mana}</p>
        </div>
        <div className="-mt-30 flex items-center justify-center">
          {opponent.deck
            .filter((card) => !card.isOnBoard)
            .slice(0, 6)
            .map((card, index, array) => (
              <button
                className="h-36 w-24 bg-white inline-block -ml-2 rounded-lg"
                style={{
                  transform: `rotate(${calculateRotationOpponent(index, array.length)}deg)`,
                }}
                key={card.id}
                onClick={() => playCard(card.id)}
              />
            ))}
        </div>
      </div>

      <section>
        <div className="h-56">
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

        <div className="h-56">
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

      <div>
        <div>
          <h1>Player</h1>
          <p>HP: {player.health}</p>
          <p>Mana: {player.mana}</p>
        </div>
        <div className="relative flex items-center justify-center">
          {player.deck
            .filter((card) => !card.isOnBoard)
            .slice(0, 6)
            .map((card, index, array) => (
              <button
                className="h-36 w-24 bg-white inline-block -ml-2 rounded-lg"
                style={{
                  transform: `rotate(${calculateRotation(index, array.length)}deg)`,
                }}
                key={card.id}
                onClick={() => playCard(card.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
