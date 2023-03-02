export type ChartMargins = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export type ChartDimensions = {
  width: number;
  height: number;
};

export const chartDefaults = {
  dimensions: { width: 600, height: 400 },
  margins: { top: 32, right: 32, bottom: 48, left: 32 },
  xMax: ({
    dimensions,
    margins,
  }: {
    dimensions: ChartDimensions;
    margins: ChartMargins;
  }) => dimensions.width - margins.left - margins.right,
  yMax: ({
    dimensions,
    margins,
  }: {
    dimensions: ChartDimensions;
    margins: ChartMargins;
  }) => dimensions.height - margins.top - margins.bottom,
  baseColor: (theme: string) => (theme === "dark" ? "#eee" : "#111"),
};
