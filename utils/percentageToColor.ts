export const percentageToColor = (
  percentage: number,
  theme: "dark" | "light" = "dark",
  maxHue = 255,
  minHue = 200
) => {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 100%, ${theme === "dark" ? "75%" : "50%"})`;
};
