"use client";

import { Badge, Checkbox, Group, Stack, Title, Text } from "@mantine/core";
import { DominionKingdoms } from "../_data/dominion/dominion-kingdoms";
import { useStoredState } from "../_hooks/useStorage";
import { DominionKingdom } from "../_data/dominion/dominion-kingdom";
import { DominionSets } from "../_data/dominion/dominion-sets";
import { DominionSet } from "../_data/dominion/dominion-set";
import { useMemo } from "react";
import { SetId } from "../_data/dominion/set-id";

const sets: DominionSet[] = DominionSets.getAllSets();

export const KingdomList: React.FC = () => {
  const kingdoms = Object.values(DominionKingdoms.kingdoms).flat();

  return (
    <Stack gap="md">
      {kingdoms.map((kingdom) => (
        <KingdomChecklistItem key={kingdom.name} kingdom={kingdom} />
      ))}
    </Stack>
  );
};

const KingdomChecklistItem: React.FC<{ kingdom: DominionKingdom }> = ({
  kingdom,
}) => {
  const [checked, setChecked] = useStoredState(kingdom.name, false);

  return (
    <Stack>
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
        label={<Title order={2}>{kingdom.name}</Title>}
      />

      <Text>{kingdom.supplyIds.join(", ")}</Text>
    </Stack>
  );
};

const SetBadgeList: React.FC<{ setIds: SetId[] }> = ({ setIds }) => {
  const sets = useMemo(
    () => setIds.map((setId) => DominionSets.getSetById(setId)),
    [setIds]
  );
  return (
    <Group>
      {sets.map((set) => {
        return <Badge key={set.name}>{set.name}</Badge>;
      })}
    </Group>
  );
};
