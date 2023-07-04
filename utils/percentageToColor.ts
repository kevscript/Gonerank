export type PercentageToColorParams = {
  percentage: number;
  theme: "dark" | "light";
  maxHue?: number;
  minHue?: number;
  opacity?: number;
};

export const percentageToColor = ({
  percentage,
  theme = "dark",
  maxHue = 220,
  minHue = 300,
  opacity = 1,
}: PercentageToColorParams) => {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsla(${hue}, 100%, ${theme === "dark" ? "75%" : "50%"}, ${
    opacity || 1.0
  })`;
};
