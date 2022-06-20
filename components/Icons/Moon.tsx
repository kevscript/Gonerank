import { SvgIconProps } from "./types";

const MoonIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 473.935 473.935"
      className={className}
    >
      <circle
        cx="236.967"
        cy="236.967"
        r="236.967"
        style={{ fill: "#344e5d" }}
      />
      <radialGradient
        id="a"
        cx="13.47"
        cy="528.389"
        r="31.929"
        gradientTransform="matrix(3.7418 0 0 -3.7418 186.567 2214.077)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".818" style={{ stopColor: "#d8d5db" }} />
        <stop offset="1" style={{ stopColor: "#d8d5db" }} />
      </radialGradient>
      <path
        d="M236.956 117.477h-.007c22.679 34.26 35.917 75.318 35.917 119.475 0 44.164-13.238 85.219-35.917 119.483h.007c65.986 0 119.475-53.496 119.475-119.483 0-65.978-53.492-119.475-119.475-119.475z"
        style={{ fill: "url(#a)" }}
      />
      <path
        d="M236.945 117.477c-65.983.007-119.468 53.496-119.468 119.475 0 65.986 53.485 119.475 119.468 119.483 22.679-34.26 35.917-75.318 35.917-119.483 0-44.156-13.238-85.215-35.917-119.475z"
        style={{ fill: "#717171" }}
      />
    </svg>
  );
};

export default MoonIcon;
