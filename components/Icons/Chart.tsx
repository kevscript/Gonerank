import { SvgIconProps } from "./types";

const ChartIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className={className}
      viewBox="0 0 490 490"
    >
      <path d="M0 37.7h88.7v414.6H0zM133.8 147.4h88.7v304.9h-88.7zM267.6 235.7h88.7v216.6h-88.7zM401.3 307.2H490v145.1h-88.7z" />
    </svg>
  );
};

export default ChartIcon;
