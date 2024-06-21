"use client";

import {
  ActionIcon,
  Button,
  Checkbox,
  Drawer,
  Group,
  MantineProvider,
  MultiSelect,
  Radio,
  RadioGroup,
  Space,
  Stack,
  Text,
  Title,
  createTheme,
} from "@mantine/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DominionKingdoms } from "../_data/dominion/dominion-kingdoms";
import { DominionSet } from "../_data/dominion/dominion-set";
import { DominionSets } from "../_data/dominion/dominion-sets";
import {
  FirstEditionSets,
  FirstToSecondEdition,
  NotFilterableSets,
  SetId,
} from "../_data/dominion/set-id";
import { useStorage, useStoredState } from "../_hooks/useStorage";
import { KingdomChecklistItem } from "./KingdomChecklistItem";
import classes from "./KingdomList.module.css";
import { DominionKingdom } from "../_data/dominion/dominion-kingdom";
import { IconAdjustments } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

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
  const [settingsOpened, { open, close }] = useDisclosure(false);
  const [specificKingdom, setSpecificKingdom] =
    useState<DominionKingdom | null>(null);
  const [selectedSets, setSelectedSets] = useStoredState<SetId[]>(
    "selectedSets",
    [SetId.BASE_SET_2]
  );
  const [kingdomSearchSetting, setKingdomSearchSetting] = useStoredState<
    "exactly" | "at_least"
  >("kingdom_search_setting", "at_least");
  const [hideFirstEdition, setHideFirstEdition] = useStoredState<boolean>(
    "hide_first_edition",
    true
  );

  useEffect(() => {
    console.log("effect: clear specific kingdom");
    setSpecificKingdom(null);
  }, [selectedSets, setSpecificKingdom]);

  useEffect(() => {
    console.log("effect: hide first edition");
    setSelectedSets(
      selectedSets.map((setId) => {
        if (hideFirstEdition && FirstEditionSets.includes(setId)) {
          return FirstToSecondEdition.get(setId) ?? setId;
        }
        return setId;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideFirstEdition]);

  const sets = useMemo(
    () =>
      DominionSets.getAllSets().filter(
        (set) =>
          !NotFilterableSets.includes(set.setId) &&
          !(hideFirstEdition && FirstEditionSets.includes(set.setId))
      ),
    [hideFirstEdition]
  );

  const filteredKingdoms = useMemo(
    () =>
      DominionKingdoms.getKingdomsForSets(
        selectedSets,
        kingdomSearchSetting === "exactly",
        hideFirstEdition
      ),
    [selectedSets, kingdomSearchSetting, hideFirstEdition]
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
        <ActionIcon variant="filled" size="lg" aria-label="Settings">
          <IconAdjustments onClick={open} />
        </ActionIcon>
        <Button onClick={setRandomKingdom}>Random</Button>
      </Group>
      <Space h="xl" />
      <Stack gap="xl">
        {kingdoms.length === 0 && <Text>No kingdoms found</Text>}
        {kingdoms.map((kingdom) => (
          <KingdomChecklistItem key={kingdom.id} kingdom={kingdom} />
        ))}
      </Stack>
      <Drawer
        size="xl"
        title="Search Settings"
        position="bottom"
        opened={settingsOpened}
        onClose={close}
      >
        <Stack>
          <Checkbox
            mt="1rem"
            label="Hide 1st Edition"
            checked={hideFirstEdition}
            onChange={(e) => setHideFirstEdition(e.target.checked)}
          />
          <Title order={4} mt="1rem">
            Kingdom containing...
          </Title>
          <Radio.Group
            name="kingdom_contains"
            value={kingdomSearchSetting}
            onChange={(value) => {
              if (value === "exactly" || value === "at_least") {
                setKingdomSearchSetting(value);
              }
            }}
          >
            <Stack gap="md">
              <Radio label="Exactly these sets" value="exactly" />
              <Radio label="At least all of these sets" value="at_least" />
            </Stack>
          </Radio.Group>
        </Stack>
      </Drawer>
    </MantineProvider>
  );
};
