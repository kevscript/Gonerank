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
      className="relative cursor-pointer lg:w-full lg:p-4"
    >
      {/** Mobile */}
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        className="flex items-center lg:hidden"
      >
        <div className="relative w-8 h-8 rounded-full bg-gray-300 flex justify-center items-end overflow-hidden shadow-inner border-2">
          <UserIcon className="w-6 h-6 fill-gray-600" />
        </div>
      </button>

      {isOpen && (
        <ul
          className="lg:hidden bg-white min-w-full w-max absolute bottom-0 left-9 flex flex-col drop-shadow-sm rounded border border-gray-300"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between h-8 bg-sky-500 hover:bg-sky-400 border-b border-gray-200 last:border-b-0"
            role="menuitem"
            onClick={() => signIn("twitter")}
          >
            <div className="flex px-2 h-full justify-center items-center border-r border-sky-400">
              <TwitterIcon className="w-3 h-3 fill-white" />
            </div>

            <span className="text-sm w-full px-2 text-white">
              Se connecter avec Twitter
            </span>
          </li>
        </ul>
      )}

      {/** Desktop */}
      <button
        className="hidden lg:flex items-center justify-between w-full h-10 rounded bg-sky-500 hover:bg-sky-400 text-sm"
        onClick={() => signIn("twitter")}
        type="button"
        id="userlogin-button"
      >
        <div className="h-full px-2 flex justify-center items-center border-r border-sky-400">
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
