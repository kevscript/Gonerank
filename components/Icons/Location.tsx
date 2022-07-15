import { SvgIconProps } from "./types";

const LocationIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M19 9A7 7 0 1 0 5 9c0 1.387.41 2.677 1.105 3.765h-.008C8.457 16.46 12 22 12 22l5.903-9.235h-.007A6.98 6.98 0 0 0 19 9zm-7 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
};

export default LocationIcon;
