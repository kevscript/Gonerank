import { SvgIconProps } from "./types";

const ChevronIcon = ({ className }: SvgIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 448">
      <path
        d="m16 764.362 144 144 144-144z"
        style={{
          fillRule: "evenodd",
          stroke: "none",
          strokeWidth: "1px",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeOpacity: 1,
        }}
        transform="translate(0 -604.362)"
        className={className}
      />
    </svg>
  );
};

export default ChevronIcon;
