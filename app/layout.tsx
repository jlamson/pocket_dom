import type { Metadata } from "next";

import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import NavRoot from "./_components/NavRoot";

export const metadata: Metadata = {
  title: "PocketDom",
  description: "For tracking numbers in Dominion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NavRoot>{children}</NavRoot>
      </body>
    </html>
  );
}
