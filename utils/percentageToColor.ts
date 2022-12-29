export const percentageToColor = (
  percentage: number,
  maxHue = 255,
  minHue = 200
) => {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 60%, 50%)`;
};
