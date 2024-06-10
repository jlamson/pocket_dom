import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Title,
} from "@mantine/core";
import TurnTracker from "./_components/TurnTracker";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="sm">
      <AppShellHeader>
        <Group h="100%" px="md">
          <Title>PocketDom</Title>
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <TurnTracker />
      </AppShellMain>
    </AppShell>
  );
}
