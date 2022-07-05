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
    <div ref={containerRef} className="relative cursor-pointer lg:w-full">
      <button
        onClick={() => toggleMenu()}
        type="button"
        id="usermenu-button"
        aria-haspopup="true"
        aria-controls="usermenu"
        className="lg:w-full lg:p-4 flex items-center lg:hover:bg-gray-100 lg:border-t lg:border-gray-300"
      >
        <div className="relative w-8 h-8 rounded-full bg-marine-300 flex justify-center items-end overflow-hidden shadow-inner">
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
        <div className="hidden lg:flex flex-col ml-2 items-start flex-1 overflow-hidden">
          <span className="w-full text-left overflow-hidden text-sm text-ellipsis font-semibold">
            {user.name}
          </span>
          <span className="w-full text-left overflow-hidden text-xs text-ellipsis">
            {user.email}
          </span>
        </div>
      </button>

      {isOpen && (
        <ul
          className="bg-white absolute bottom-0 lg:bottom-16 left-9 lg:left-0 lg:w-full flex flex-col drop-shadow-sm rounded lg:rounded-none border border-gray-300 lg:border-y lg:border-x-0"
          id="usermenu"
          role="menu"
          aria-labelledby="usermenu-button"
        >
          <li
            className="flex items-center justify-between px-4 h-8 lg:h-10 hover:bg-gray-200 border-b border-gray-200 last:border-b-0"
            role="menuitem"
            onClick={() => signOut()}
          >
            <span>Déconnexion</span>
            <SignOutIcon className="ml-2 w-4 h-4" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default LoggedInNavigation;
