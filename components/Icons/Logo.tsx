import { SvgIconProps } from "./types";

const LogoIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 500 500"
      className={className}
    >
      <path
        strokeLinecap="round"
        d="M-27.563-21.731a5.832 5.832 0 0 1 5.832-5.832H21.73a5.832 5.832 0 0 1 5.832 5.832V21.73a5.832 5.832 0 0 1-5.832 5.832H-21.73a5.832 5.832 0 0 1-5.832-5.832z"
        style={{
          stroke: "#27169c",
          strokeWidth: 16,
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#4834f7",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(8.78 0 0 8.78 249.84 249.84)"
        vectorEffect="non-scaling-stroke"
      />
      <g>
        <text
          xmlSpace="preserve"
          fontFamily="Inter"
          fontSize="264"
          fontWeight="900"
          style={{
            stroke: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "#fff",
            fillRule: "nonzero",
            opacity: 1,
            whiteSpace: "pre",
          }}
          transform="matrix(1.05 0 0 1.05 249.84 240.41)"
        >
          <tspan x="-190.12" y="108.53">
            GR
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default LogoIcon;
