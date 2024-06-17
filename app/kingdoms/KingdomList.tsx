"use client";

import {
  Checkbox,
  MantineProvider,
  MultiSelect,
  Select,
  Space,
  Stack,
  createTheme,
} from "@mantine/core";
import React, { useMemo } from "react";
import { DominionKingdoms } from "../_data/dominion/dominion-kingdoms";
import { DominionSet } from "../_data/dominion/dominion-set";
import { DominionSets } from "../_data/dominion/dominion-sets";
import { KingdomChecklistItem } from "./KingdomChecklistItem";
import classes from "./KingdomList.module.css";
import { useStoredState } from "../_hooks/useStorage";
import { SetId } from "../_data/dominion/set-id";

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

const sets: DominionSet[] = DominionSets.getAllSets();

export const KingdomList: React.FC = () => {
  const [selectedSet, setSelectedSet] = useStoredState<SetId>(
    "selectedSet",
    SetId.BASE_SET
  );

  const sets = useMemo(() => DominionSets.getAllSets(), []);

  const kingdoms = useMemo(() => {
    return DominionKingdoms.kingdoms[selectedSet] || [];
  }, [selectedSet]);

  return (
    <MantineProvider theme={theme}>
      <Select
        data={sets.map((set) => ({
          value: set.setId,
          label: set.name,
        }))}
        checkIconPosition="left"
        value={selectedSet}
        onChange={(selected) => setSelectedSet(selected as SetId)}
      />
      <Space h="xl" />
      <Stack gap="xl">
        {kingdoms.map((kingdom) => (
          <KingdomChecklistItem key={kingdom.name} kingdom={kingdom} />
        ))}
      </Stack>
    </MantineProvider>
  );
};
