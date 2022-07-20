import { SvgIconProps } from "./types";

const ArchiveIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      className={className}
      viewBox="0 0 58 58"
    >
      <path d="M58 34V19.004l-18.357.008C38.314 23.686 33.989 27 29.061 27c-4.913 0-9.237-3.324-10.576-8.012L0 18.996V34h58zM29.061 41.955a9.021 9.021 0 0 0 8.474-5.956H20.394c1.285 3.467 4.802 5.956 8.667 5.956z" />
      <path d="M29.061 43.955c-5.032 0-9.439-3.3-10.782-7.956H0v17l58-.023V36H39.643c-1.327 4.656-5.651 7.955-10.582 7.955zM44.391 5H13.609L.613 16.996l2.951-.002L14.391 7h29.218l10.835 10.001 2.952.003z" />
    </svg>
  );
};

export default ArchiveIcon;
