import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";
import Image from "next/image";
import useOutsideClick from "../hooks/useOutsideClick";
import SignOutIcon from "./Icons/SignOut";
import UserIcon from "./Icons/User";

export type LoggedInNavigationProps = {
  user: Session["user"];
};

const LoggedInNavigation = ({ user }: LoggedInNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const toggleMenu = () => setIsOpen((x) => !x);
  // useOutsideClick is a useEffect
  useOutsideClick({ ref: containerRef, action: () => setIsOpen(false) });

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center cursor-pointer xl:w-full"
    >
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        name="ouvrir menu utilisateur"
        className="flex items-center xl:w-full xl:p-4 xl:hover:bg-gray-100 xl:border-t xl:border-gray-300 dark:xl:hover:bg-dark-400 dark:xl:border-dark-300"
      >
        <div className="relative flex items-end justify-center w-8 h-8 overflow-hidden rounded-full shadow-inner bg-marine-300 dark:bg-marine-600">
          {user.image ? (
            <Image
              src={user.image}
              alt="user avatar"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <UserIcon className="w-6 h-6 fill-marine-600" />
          )}
        </div>
        <div className="flex-col items-start flex-1 hidden ml-2 overflow-hidden xl:flex">
          <span className="w-full overflow-hidden text-sm font-semibold text-left text-ellipsis">
            {user.name}
          </span>
          <span className="w-full overflow-hidden text-xs text-left text-ellipsis">
            {user.email}
          </span>
        </div>
      </button>

      {isOpen && (
        <ul
          className="absolute bottom-0 flex flex-col overflow-hidden bg-white border border-gray-300 rounded dark:bg-dark-400 dark:border-dark-600 xl:bottom-16 left-14 xl:left-0 xl:w-full drop-shadow-sm xl:rounded-none xl:border-y xl:border-x-0"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between h-8 px-4 border-b border-gray-200 dark:border-dark-600 xl:h-10 hover:bg-gray-200 dark:hover:bg-dark-300 last:border-b-0"
            role="menuitem"
            onClick={() => signOut()}
          >
            <span>Déconnexion</span>
            <SignOutIcon className="w-4 h-4 ml-2 dark:fill-white" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoggedInNavigation;
