"use client";

import { useCallback } from "react";
import { useStoredState } from "../_hooks/useStorage";
import {
  Button,
  Group,
  Title,
  Text,
  Divider,
  Stack,
  Space,
} from "@mantine/core";

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
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} style={{ weight: "1" }}>
          Turn Tracker
        </Title>
        <Button onClick={endTurn}>End turn</Button>
      </Group>
      <Space h="lg" />
      <TrackerRow label="Actions" value={actions} setValue={setActions} />
      <TrackerRow label="Coins" value={coins} setValue={setCoins} />
      <TrackerRow label="Buys" value={buys} setValue={setBuys} />
    </Stack>
  );
};

interface TrackerRowProps {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

const TrackerRow: React.FC<TrackerRowProps> = ({ label, value, setValue }) => {
  function decrementBy(amount: number) {
    setValue(Math.max(0, value - amount));
  }
  function incrementBy(amount: number) {
    setValue(value + amount);
  }
  return (
    <Group justify="center" align="baseline" w="100%">
      <Button onClick={() => decrementBy(2)}>-2</Button>
      <Button onClick={() => decrementBy(1)}>-1</Button>
      <Text style={{ flexGrow: 1, textAlign: "center" }}>
        {label}: {value}
      </Text>
      <Button onClick={() => incrementBy(1)}>+1</Button>
      <Button onClick={() => incrementBy(2)}>+2</Button>
    </Group>
  );
};

export default TurnTracker;
