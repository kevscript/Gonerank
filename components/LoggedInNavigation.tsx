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
      className="relative cursor-pointer lg:w-full lg:flex lg:border-t border-gray-200 lg:p-4 hover:bg-gray-100"
      onClick={() => toggleMenu()}
    >
      <div className="relative w-8 h-8 rounded-full bg-purple-300 flex justify-center items-end overflow-hidden shadow-inner">
        {user.image ? (
          <Image
            src={user.image}
            alt="user avatar"
            layout="fill"
            objectFit="contain"
          />
        ) : (
          <UserIcon className="w-6 h-6 fill-purple-600" />
        )}
      </div>
      <div className="hidden lg:flex items-center ml-2">
        <span>{user.name}</span>
      </div>

      {isOpen && (
        <div
          className="absolute flex items-center justify-between top-0 lg:-top-10 left-9 lg:left-0 lg:w-full px-4 h-8 lg:h-10 border lg:border-t lg:border-x-0 lg:border-b-0 border-gray-200 rounded bg-white drop-shadow lg:drop-shadow-none lg:rounded-none hover:bg-gray-200"
          onClick={() => signOut()}
        >
          <span>Déconnexion</span>
          <SignOutIcon className="ml-2 w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default LoggedInNavigation;
