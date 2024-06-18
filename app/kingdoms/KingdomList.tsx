"use client";

import {
  Button,
  Checkbox,
  Group,
  MantineProvider,
  MultiSelect,
  Select,
  Space,
  Stack,
  Text,
  createTheme,
} from "@mantine/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DominionKingdoms } from "../_data/dominion/dominion-kingdoms";
import { DominionSet } from "../_data/dominion/dominion-set";
import { DominionSets } from "../_data/dominion/dominion-sets";
import { SetId } from "../_data/dominion/set-id";
import { useStorage, useStoredState } from "../_hooks/useStorage";
import { KingdomChecklistItem } from "./KingdomChecklistItem";
import classes from "./KingdomList.module.css";
import { DominionKingdom } from "../_data/dominion/dominion-kingdom";

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

const sets: DominionSet[] = DominionSets.getAllSets();

const randomFrom = <T,>(arr: T[]): T | null => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
};

export const KingdomList: React.FC = () => {
  const storage = useStorage();
  const [specificKingdom, setSpecificKingdom] =
    useState<DominionKingdom | null>(null);
  const [selectedSets, setSelectedSets] = useStoredState<SetId[]>(
    "selectedSets",
    [SetId.BASE_SET_2]
  );

  useEffect(() => {
    setSpecificKingdom(null);
  }, [selectedSets, setSpecificKingdom]);

  const sets = useMemo(() => DominionSets.getAllSets(), []);
  const filteredKingdoms = useMemo(
    () => DominionKingdoms.getKingdomsForSets(selectedSets),
    [selectedSets]
  );
  const kingdoms: DominionKingdom[] = useMemo(() => {
    if (specificKingdom) {
      return [specificKingdom];
    } else {
      return filteredKingdoms;
    }
  }, [filteredKingdoms, specificKingdom]);

  const setRandomKingdom = useCallback(() => {
    const initialKingdomList =
      filteredKingdoms.length > 0
        ? filteredKingdoms
        : DominionKingdoms.getAllKingdoms();
    const incompleteKingdoms = initialKingdomList.filter(
      (kingdom) => storage.getItem(kingdom.id) !== "true"
    );
    const randomKingdom = randomFrom(
      incompleteKingdoms.length > 0 ? incompleteKingdoms : filteredKingdoms
    );
    setSpecificKingdom(randomKingdom);
  }, [filteredKingdoms, setSpecificKingdom, storage]);

  return (
    <MantineProvider theme={theme}>
      <Group justify="stretch">
        <MultiSelect
          style={{ flexGrow: 1 }}
          data={sets.map((set) => ({
            value: set.setId,
            label: set.name,
          }))}
          checkIconPosition="left"
          value={selectedSets}
          onChange={(values) => setSelectedSets(values as SetId[])}
          clearable
        />
        <Button onClick={setRandomKingdom}>Random</Button>
      </Group>
      <Space h="xl" />
      <Stack gap="xl">
        {kingdoms.length === 0 && <Text>No kingdoms found</Text>}
        {kingdoms.map((kingdom) => (
          <KingdomChecklistItem key={kingdom.id} kingdom={kingdom} />
        ))}
      </Stack>
    </MantineProvider>
  );
};
