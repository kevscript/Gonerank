import Tooltip from "react-tooltip";

type LatestSeasonTooltipWrapperProps = {
  id: string;
  theme: "dark" | "light";
  children: React.ReactNode;
};

const LatestSeasonTooltipWrapper = ({
  id,
  theme,
  children,
}: LatestSeasonTooltipWrapperProps) => {
  return (
    <Tooltip
      id={id}
      place="left"

      // style={{
      //   background: `${theme === "dark" ? "#000000" : "#eeeeee"}`,
      //   padding: "4px 8px 4px 4px",
      // }}
    >
      {children}
    </Tooltip>
  );
};

export default LatestSeasonTooltipWrapper;
