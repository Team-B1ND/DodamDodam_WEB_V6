import { DefaultTheme } from "styled-components";
import { palette } from "./palette";

export const lightTheme: DefaultTheme = {
  ...palette,

  backgroundColor: "#f0f2f4",
  backgroundColor2: "#ffffff",
  backgroundColor3: "#ffffff",
  backgroundColor4: "#ffffff",
  borderColor: "#3d3d3d",
  borderColor2: "#3d3d3d",
  contrast: "#000000",
  contrast2: "#5c5c5c",
  hoverColor: "#e2e2e2",
  headerBoxShadow: "0 1px 1px 0 hsl(0deg 0% 80% / 80%)",
  darkmodeButtonColor: "#efefef",
};

export const darkTheme: DefaultTheme = {
  ...palette,

  backgroundColor: "#1a1a1a",
  backgroundColor2: "#292929",
  backgroundColor3: "#1a1a1a",
  backgroundColor4: "#292929",
  borderColor: "#3d3d3d",
  borderColor2: "#1a1a1a",
  contrast: "#ffffff",
  contrast2: "#e2e2e2",
  hoverColor: "#e2e2e2",
  headerBoxShadow: "0 1px 1px 0 rgba(61,61,61,.8)",
  darkmodeButtonColor: "#3d3d3d",
};
