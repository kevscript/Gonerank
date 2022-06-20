import { SvgIconProps } from "./types";

type ClubIconProps = SvgIconProps & {
  primary: string;
  secondary: string;
};

const ClubIcon = ({ className, primary, secondary }: ClubIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 58 58"
      className={className}
    >
      <path
        d="M29 0S22.333 8 7 8v19.085c0 9.966 4.328 19.577 12.164 25.735C21.937 55 25.208 56.875 29 58c3.792-1.125 7.062-3 9.836-5.18C46.672 46.662 51 37.051 51 27.085V8C35.667 8 29 0 29 0z"
        fill={primary}
      />
      <path
        d="M29 51.661c-2.123-.833-4.178-2.025-6.128-3.558C16.69 43.245 13 35.388 13 27.085V13.628c7.391-.943 12.639-3.514 16-5.798v43.831z"
        fill={secondary}
      />
    </svg>
  );
};

export default ClubIcon;
