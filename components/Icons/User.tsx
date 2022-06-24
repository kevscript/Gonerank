import { SvgIconProps } from "./types";

const UserIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 258.75 258.75"
      className={className}
    >
      <circle cx="129.375" cy="60" r="60" />
      <path d="M129.375 150c-60.061 0-108.75 48.689-108.75 108.75h217.5c0-60.061-48.689-108.75-108.75-108.75z" />
    </svg>
  );
};

export default UserIcon;
