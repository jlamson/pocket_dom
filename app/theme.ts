import { createTheme, MantineColorsTuple } from "@mantine/core";

/**
 * Generated from https://mantine.dev/colors-generator/?color=5474B4
 * Selected "Pale Blue"
 */
export const paleBlue: MantineColorsTuple = [
  "#eef3ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc1",
  "#5f7cb8",
  "#5474b4",
  "#44639f",
  "#39588f",
  "#2d4b81",
];

export const theme = createTheme({
  primaryColor: "paleBlue",
  colors: {
    paleBlue,
  },
  fontFamily: "Roboto, sans-serif",
  headings: {
    fontFamily: "Roboto, sans-serif",
  },
});
