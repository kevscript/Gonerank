import { SvgIconProps } from "./types";

const TrophyIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.675 4.5H6.227l.635 4.418c1.222 2.623 4.956 2.623 6.178 0l.635-4.418Zm-7.448-2a2 2 0 0 0-1.98 2.285l.64 4.446c.024.17.073.336.144.492 1.925 4.216 7.915 4.216 9.84 0 .071-.156.12-.322.144-.492l.64-4.446a2 2 0 0 0-1.98-2.285H6.227Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.95 15.5v-3h2v3h-2Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.058 16.5a2.778 2.778 0 0 1 3.786 0H8.058Zm4.91-1a4.277 4.277 0 0 0-6.033 0l-.796.791c-.632.63-.187 1.709.706 1.709h6.212c.893 0 1.338-1.08.706-1.709l-.796-.791ZM5.421 5.5a1 1 0 0 1-1 1h-2.01a1 1 0 0 1 0-2h2.01a1 1 0 0 1 1 1Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M2.268 4.512a1.003 1.003 0 0 1 1.135.848l.07.489a3.165 3.165 0 0 0 2.62 2.667l-.328 1.968a5.168 5.168 0 0 1-4.277-4.356l-.07-.488a.997.997 0 0 1 .85-1.128ZM14.579 5.5a1 1 0 0 0 1 1h2.01a1 1 0 1 0 0-2h-2.01a1 1 0 0 0-1 1Z"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.732 4.512a1.003 1.003 0 0 0-1.135.848l-.07.489a3.166 3.166 0 0 1-2.62 2.667l.328 1.968a5.168 5.168 0 0 0 4.277-4.356l.07-.488a.997.997 0 0 0-.85-1.128Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default TrophyIcon;
