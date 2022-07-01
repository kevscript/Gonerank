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
    <div ref={containerRef} className="relative cursor-pointer lg:w-full">
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        className="lg:w-full lg:p-4 flex items-center lg:hover:bg-gray-100 lg:border-t lg:border-gray-300"
      >
        <div className="relative w-8 h-8 rounded-full bg-gray-300 flex justify-center items-end overflow-hidden shadow-inner border-2">
          <UserIcon className="w-6 h-6 fill-gray-600" />
        </div>
        <div className="hidden lg:flex flex-col ml-2 items-start flex-1 overflow-hidden">
          <span className="w-full text-left overflow-hidden text-sm text-ellipsis font-semibold">
            Connexion
          </span>
        </div>
      </button>

      {isOpen && (
        <ul
          className="bg-white min-w-full w-max absolute bottom-0 lg:bottom-16 left-9 lg:left-0 flex flex-col drop-shadow-sm rounded lg:rounded-none border border-gray-300 lg:border-y lg:border-x-0"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between h-8 lg:h-10 bg-sky-400 hover:bg-sky-500 border-b border-gray-200 last:border-b-0"
            role="menuitem"
            onClick={() => signIn("twitter")}
          >
            <div className="flex px-2 h-full justify-center items-center border-r border-sky-300">
              <TwitterIcon className="w-3 h-3 fill-white" />
            </div>

            <span className="text-sm w-full px-2 text-white">
              Se connecter avec Twitter
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoggedOutNavigation;
