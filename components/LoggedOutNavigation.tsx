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
      className="relative cursor-pointer lg:w-full lg:flex lg:border-t border-gray-200"
    >
      {/* Mobile UI */}
      <div
        className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-end overflow-hidden shadow-inner lg:hidden"
        onClick={() => toggleMenu()}
      >
        <UserIcon className="w-6 h-6 fill-gray-400" />
      </div>
      <div className="lg:hidden">
        {isOpen && (
          <div
            className="absolute flex items-center justify-between top-0 left-9 px-4 h-8 border border-gray-200 rounded bg-white drop-shadow"
            onClick={() => signIn("twitter")}
          >
            <span>Connexion</span>
            <TwitterIcon className="ml-2 w-3 h-3 fill-cyan-500" />
          </div>
        )}
      </div>

      {/* Desktop UI */}
      <div
        className="hidden lg:flex w-full p-4 hover:bg-gray-100"
        onClick={() => signIn("twitter")}
      >
        <div className="hidden w-8 h-8 rounded-full bg-gray-200 justify-center items-end overflow-hidden shadow-inner lg:flex">
          <UserIcon className="w-6 h-6 fill-gray-400" />
        </div>
        <div className="hidden lg:flex justify-center items-center ml-2">
          <span>Connexion</span>
          <TwitterIcon className="ml-2 w-4 h-4 fill-cyan-500" />
        </div>
      </div>
    </div>
  );
};

export default LoggedOutNavigation;
