import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import TwitterIcon from "./Icons/Twitter";
import UserIcon from "./Icons/User";

const LoggedOutNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const toggleMenu = () => setIsOpen((x) => !x);
  // useOutsideClick is a useEffect
  useOutsideClick({ ref: containerRef, action: () => setIsOpen(false) });

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer xl:w-full xl:p-4"
    >
      {/** Mobile */}
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        className="flex items-center xl:hidden"
      >
        <div className="relative flex items-end justify-center w-8 h-8 overflow-hidden bg-gray-300 border-2 rounded-full shadow-inner">
          <UserIcon className="w-6 h-6 fill-gray-600" />
        </div>
      </button>

      {isOpen && (
        <ul
          className="absolute bottom-0 flex flex-col min-w-full bg-white border border-gray-300 rounded xl:hidden w-max left-9 drop-shadow-sm"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between h-8 border-b border-gray-200 bg-sky-500 hover:bg-sky-400 last:border-b-0"
            role="menuitem"
            onClick={() => signIn("twitter")}
          >
            <div className="flex items-center justify-center h-full px-2 border-r border-sky-400">
              <TwitterIcon className="w-3 h-3 fill-white" />
            </div>

            <span className="w-full px-2 text-sm text-white">
              Se connecter avec Twitter
            </span>
          </li>
        </ul>
      )}

      {/** Desktop */}
      <button
        className="items-center justify-between hidden w-full h-10 text-sm rounded xl:flex bg-sky-500 hover:bg-sky-400"
        onClick={() => signIn("twitter")}
        type="button"
        id="userlogin-button"
      >
        <div className="flex items-center justify-center h-full px-2 border-r border-sky-400">
          <TwitterIcon className="w-3 h-3 fill-white " />
        </div>
        <span className="flex-1 px-2 text-white">
          Se connecter avec Twitter
        </span>
      </button>
    </div>
  );
};

export default LoggedOutNavigation;
