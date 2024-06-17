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
  NumberInput,
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
    <Stack gap="xl" justify="space-around">
      <Group justify="space-between">
        <Title order={2} style={{ weight: "1" }}>
          Turn Tracker
        </Title>
        <Button onClick={endTurn}>End turn</Button>
      </Group>
      <TrackerRow label="Actions" value={actions} setValue={setActions} />
      <Space h="md" />
      <TrackerRow label="Coins" value={coins} setValue={setCoins} />
      <Space h="md" />
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
  const onNumberInputChange = (value: number | string) => {
    parseInt(value as string)
      ? setValue(parseInt(value as string))
      : setValue(0);
  };
  const buttonStyle = { flexGrow: 1 };
  return (
    <Stack style={{ flexGrow: 1 }} gap="sm">
      <Group justify="stretch">
        <Title order={3} style={{ textAlign: "center" }}>
          {label}
        </Title>
        <NumberInput
          value={value}
          onChange={onNumberInputChange}
          size="xl"
          style={{ flexGrow: 1 }}
        />
      </Group>
      <Group justify="center" align="baseline" w="100%">
        <Button style={buttonStyle} h="4rem" onClick={() => decrementBy(2)}>
          -2
        </Button>
        <Button style={buttonStyle} h="4rem" onClick={() => decrementBy(1)}>
          -1
        </Button>
        <Button style={buttonStyle} h="4rem" onClick={() => incrementBy(1)}>
          +1
        </Button>
        <Button style={buttonStyle} h="4rem" onClick={() => incrementBy(2)}>
          +2
        </Button>
      </Group>
    </Stack>
  );
};

export default TurnTracker;
