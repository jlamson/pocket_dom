"use client";

import { useCallback } from "react";
import { useStoredState } from "../_hooks/useStorage";

const TurnTracker: React.FC = () => {
  const [actions, setActions] = useStoredState("actions", 0);
  const [coins, setCoins] = useStoredState("coins", 0);
  const [buys, setBuys] = useStoredState("buys", 0);
  const endTurn = useCallback(() => {
    setActions(0);
    setCoins(0);
    setBuys(0);
  }, [setActions, setCoins, setBuys]);

  return (
    <div className="flex flex-col">
      <h2>Turn Tracker</h2>
      <button onClick={endTurn}>End turn</button>
      <TrackerRow label="Actions" value={actions} setValue={setActions} />
      <TrackerRow label="Coins" value={coins} setValue={setCoins} />
      <TrackerRow label="Buys" value={buys} setValue={setBuys} />
    </div>
  );
};

interface TrackerRowProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

const TrackerRow: React.FC<TrackerRowProps> = ({ label, value, setValue }) => {
  const decrement = () => setValue(Math.max(0, value - 1));
  const increment = () => setValue(value + 1);
  return (
    <>
      <h3>{label}</h3>
      <div className="flex items-center justify-center">
        <button onClick={decrement}>-</button>
        <span>{value}</span>
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default TurnTracker;
