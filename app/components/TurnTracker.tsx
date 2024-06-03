"use client";

import { useCallback, useState } from "react";

const TurnTracker: React.FC = () => {
  const [actions, setActions] = useState(0);
  const [coins, setCoins] = useState(0);
  const [buys, setBuys] = useState(0);
  const endTurn = useCallback(() => {
    setActions(0);
    setCoins(0);
    setBuys(0);
  }, [setActions, setCoins, setBuys]);

  return (
    <div className="flex flex-col">
      <h2>Turn Tracker</h2>
      <button onClick={endTurn}>End turn</button>
      <h3>Actions</h3>
      <div className="flex items-center justify-center">
        <button className="p-8" onClick={() => setActions(actions - 1)}>
          -
        </button>
        <span>{actions}</span>
        <button onClick={() => setActions(actions + 1)}>+</button>
      </div>
      <h3>Coins</h3>
      <div className="flex items-center justify-center">
        <button className="p-8" onClick={() => setCoins(coins - 1)}>
          -
        </button>
        <span>{coins}</span>
        <button onClick={() => setCoins(coins + 1)}>+</button>
      </div>
      <h3>Buys</h3>
      <div className="flex items-center justify-center">
        <button className="p-8" onClick={() => setBuys(buys - 1)}>
          -
        </button>
        <span>{buys}</span>
        <button onClick={() => setBuys(buys + 1)}>+</button>
      </div>
    </div>
  );
};

export default TurnTracker;
