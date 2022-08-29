import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import TwitterIcon from "../Icons/Twitter";
import UserIcon from "../Icons/User";

const LoggedOutNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const toggleMenu = () => setIsOpen((x) => !x);
  // useOutsideClick is a useEffect
  useOutsideClick({ ref: containerRef, action: () => setIsOpen(false) });

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center cursor-pointer xl:w-full xl:p-4"
    >
      {/** Mobile */}
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        name="ouvrir menu utilisateur"
        className="flex items-center justify-center xl:hidden"
      >
        <div className="relative flex items-end justify-center w-8 h-8 overflow-hidden bg-gray-300 border-2 rounded-full shadow-inner dark:bg-dark-600 dark:border-dark-300">
          <UserIcon className="w-6 h-6 fill-gray-600 dark:fill-gray-300" />
        </div>
      </button>

      {isOpen && (
        <ul
          className="absolute bottom-0 flex flex-col min-w-full overflow-hidden bg-white border border-gray-300 rounded dark:bg-dark-500 dark:border-dark-400 xl:hidden w-max left-14 drop-shadow-sm"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between h-8 bg-marine-600 hover:bg-marine-700 last:border-b-0"
            role="menuitem"
            onClick={() => signIn("twitter")}
          >
            <div className="flex items-center justify-center h-full px-2 border-r border-marine-400">
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
        className="items-center justify-between hidden w-full h-10 text-sm rounded xl:flex bg-marine-600 hover:bg-marine-700"
        onClick={() => signIn("twitter")}
        type="button"
        id="userlogin-button"
      >
        <div className="flex items-center justify-center h-full px-2 border-r border-marine-400">
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
