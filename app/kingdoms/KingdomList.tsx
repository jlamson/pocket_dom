"use client";

import {
  Checkbox,
  MantineProvider,
  Select,
  Space,
  Stack,
  createTheme,
} from "@mantine/core";
import React, { useMemo, useState } from "react";
import { DominionKingdoms } from "../_data/dominion/dominion-kingdoms";
import { DominionSet } from "../_data/dominion/dominion-set";
import { DominionSets } from "../_data/dominion/dominion-sets";
import { SetId } from "../_data/dominion/set-id";
import { useStorage } from "../_hooks/useStorage";
import { KingdomChecklistItem } from "./KingdomChecklistItem";
import classes from "./KingdomList.module.css";

const theme = createTheme({
  components: {
    Checkbox: Checkbox.extend({ classNames: classes }),
  },
});

const sets: DominionSet[] = DominionSets.getAllSets();

export const KingdomList: React.FC = () => {
  const storage = useStorage();
  const [selectedSet, setSelectedSet] = useState<SetId | "random">(
    SetId.BASE_SET
  );

  const sets = useMemo(() => DominionSets.getAllSets(), []);

  const kingdoms = useMemo(() => {
    if (selectedSet === "random") {
      const allKingdoms = Object.values(DominionKingdoms.kingdoms)
        .flat()
        .filter((kingdom) => storage.getItem(kingdom.id) !== "false");
      return [allKingdoms[Math.floor(Math.random() * allKingdoms.length)]];
    } else {
      return DominionKingdoms.kingdoms[selectedSet] || [];
    }
  }, [selectedSet, storage]);
  return (
    <MantineProvider theme={theme}>
      <Select
        data={[
          { value: "random", label: "Random" },
          ...sets.map((set) => ({
            value: set.setId,
            label: set.name,
          })),
        ]}
        checkIconPosition="left"
        value={selectedSet}
        onChange={(selected) => setSelectedSet(selected as SetId)}
      />
      <Space h="xl" />
      <Stack gap="xl">
        {kingdoms.map((kingdom) => (
          <KingdomChecklistItem key={kingdom.id} kingdom={kingdom} />
        ))}
      </Stack>
    </MantineProvider>
  );
};
