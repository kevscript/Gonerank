import { SvgIconProps } from "./types";

const SunIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 473.931 473.931"
      className={className}
    >
      <circle
        cx="236.966"
        cy="236.966"
        r="236.966"
        style={{ fill: "#f2be3e" }}
      />
      <circle
        cx="236.966"
        cy="236.966"
        r="117.154"
        style={{ fill: "#f1eb75" }}
      />
    </svg>
  );
};

export default SunIcon;
