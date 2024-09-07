"use client";

import { useStorage } from "@/app/_hooks/useStorage";
import { NOOP_STORAGE } from "@/app/_util/storageUtils";
import { Group, Textarea } from "@mantine/core";
import React from "react";

export const KingdomChecklistSummary: React.FC = () => {
  const storage = useStorage();
  if (storage === NOOP_STORAGE) {
    return (
      <KingdomChecklistSummaryWrapper>
        <NoLocalStorage />
      </KingdomChecklistSummaryWrapper>
    );
  }

  const localStorage = storage as Storage;
  const all = JSON.stringify(localStorage, null, 2);

  return (
    <KingdomChecklistSummaryWrapper>
      <Textarea
        label="Autosize with 4 rows max"
        placeholder="Autosize with 4 rows max"
        autosize
        minRows={2}
        maxRows={4}
        w="100%"
        value={all}
      />
    </KingdomChecklistSummaryWrapper>
  );
};

function KingdomChecklistSummaryWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <Group justify="stretch">
      <h1>Kingdom Checklist Summary</h1>
      {children}
    </Group>
  );
}

const NoLocalStorage: React.FC = () => {
  return <p>No local storage detected in browser.</p>;
};
