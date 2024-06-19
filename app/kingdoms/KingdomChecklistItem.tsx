"use client";

import { Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { useStoredState } from "../_hooks/useStorage";
import { DominionKingdom, Metadata } from "../_data/dominion/dominion-kingdom";
import { DominionSets } from "../_data/dominion/dominion-sets";
import React, { useMemo } from "react";
import { SetId } from "../_data/dominion/set-id";
import { Card } from "../_data/dominion/card";

export const KingdomChecklistItem: React.FC<{ kingdom: DominionKingdom }> = ({
  kingdom,
}) => {
  const [checked, setChecked] = useStoredState(kingdom.id, false);
  const sets = useMemo(
    () => kingdom.setIds.map((setId) => DominionSets.getSetById(setId)),
    [kingdom]
  );
  const cardIds = useMemo(
    () => kingdom.supplyIds.map((id) => DominionSets.getCardById(id)),
    [kingdom]
  );
  const cardsBySet: Map<SetId, Card[]> = useMemo(
    () =>
      new Map(
        sets.map((set) => {
          let setId = set.setId;
          let cards = cardIds.filter((card) => card.setId === setId);
          return [setId, cards];
        })
      ),
    [cardIds, sets]
  );

  return (
    <Stack>
      <Checkbox
        checked={checked}
        onChange={() => setChecked(!checked)}
        size="xxl"
        label={kingdom.name}
      />
      <BadgeList setIds={kingdom.setIds} metadata={kingdom.metadata} />
      {sets.map((set) => (
        <Text key={set.name}>
          <b>{set.name}</b>:{" "}
          {(cardsBySet.get(set.setId) as Card[])
            .map((card) => {
              const traits = kingdom.traitIds;
              if (traits.length > 0) {
                let traitedName;
                traits.forEach(([traitId, cardId]) => {
                  if (cardId == card.id) {
                    const trait = DominionSets.getTraitById(traitId);
                    traitedName = `${trait.name} ⇒ ${card.name}`;
                  }
                });
                return traitedName ?? card.name;
              }
              return card.name;
            })
            .join(", ")}
        </Text>
      ))}
      {kingdom.baneCardId ? (
        <Text>Bane: {DominionSets.getCardById(kingdom.baneCardId).name}</Text>
      ) : null}
      {kingdom.eventIds?.length > 0 ? (
        <CardNameList
          label="Event(s)"
          cards={kingdom.eventIds.map(
            (id) => DominionSets.getEventById(id).name
          )}
        />
      ) : null}
      {kingdom.landmarkIds?.length > 0 ? (
        <CardNameList
          label="Landmark(s)"
          cards={kingdom.landmarkIds.map(
            (id) => DominionSets.getLandmarkById(id).name
          )}
        />
      ) : null}
      {kingdom.projectIds?.length > 0 ? (
        <CardNameList
          label="Project(s)"
          cards={kingdom.projectIds.map(
            (id) => DominionSets.getProjectById(id).name
          )}
        />
      ) : null}
      {kingdom.boonIds?.length > 0 ? (
        <CardNameList
          label="Boon(s)"
          cards={kingdom.boonIds.map((id) => DominionSets.getBoonById(id).name)}
        />
      ) : null}
      {kingdom.wayIds?.length > 0 ? (
        <CardNameList
          label="Way(s)"
          cards={kingdom.wayIds.map((id) => DominionSets.getWayById(id).name)}
        />
      ) : null}
      {kingdom.allyIds?.length > 0 ? (
        <CardNameList
          label="Ally(s)"
          cards={kingdom.allyIds.map((id) => DominionSets.getAllyById(id).name)}
        />
      ) : null}
      {kingdom.traitIds?.length > 0 ? (
        <CardNameList
          label="Trait(s)"
          cards={kingdom.traitIds.map(
            (id) => DominionSets.getTraitById(id[0]).name
          )}
        />
      ) : null}
    </Stack>
  );
};

const BadgeList: React.FC<{ setIds: SetId[]; metadata: Metadata }> = ({
  setIds,
  metadata,
}) => {
  const sets = useMemo(
    () => setIds.map((setId) => DominionSets.getSetById(setId)),
    [setIds]
  );
  return (
    <Group>
      {sets.map((set) => (
        <Badge key={set.name}>{set.name}</Badge>
      ))}
      {metadata.useColonies ? (
        <Badge color="teal">Colonies/Platinum</Badge>
      ) : null}
      {metadata.useShelters ? <Badge color="pink">Shelters</Badge> : null}
    </Group>
  );
};

const CardNameList: React.FC<{ label: String; cards: string[] }> = ({
  label,
  cards,
}) => {
  return (
    <Text>
      <b>{label}</b>: {cards.join(", ")}
    </Text>
  );
};
