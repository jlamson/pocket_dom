"use client";

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Group,
  MantineProvider,
  NavLink,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { theme } from "../theme";

export default function NavRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShellHeader>
          <Group h="100%" px="md">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Title>PocketDom</Title>
          </Group>
        </AppShellHeader>
        <AppShellNavbar p="md">
          <NavLink href="/turntracker" label="Turn Tracker" />
          <NavLink href="/kingdoms" label="Kingdoms" />
          <NavLink
            href="/kingdoms/checklist_summary"
            label="Checklist Summary"
          />
        </AppShellNavbar>
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </MantineProvider>
  );
}
