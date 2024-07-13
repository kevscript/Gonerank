import { useRef, useState } from "react";
import UserIcon from "../Icons/User";
import { signIn } from "next-auth/react";
import TwitterIcon from "../Icons/Twitter";
import useOutsideClick from "@/hooks/useOutsideClick";

export function LoggedOutMobile() {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((x) => !x);
  }

  useOutsideClick({ ref: containerRef, action: () => setIsOpen(false) });

  return (
    <div className="relative w-fit h-fit" ref={containerRef}>
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
        <ul className="absolute right-0 overflow-hidden bg-white dark:bg-black border dark:border-dark-300 rounded top-10 min-w-[8rem] p-1 w-max">
          <li
            className="flex items-center gap-2 p-2 overflow-hidden rounded-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-dark-500"
            role="menuitem"
            onClick={() => signIn("twitter")}
          >
            <TwitterIcon className="w-3 h-3 fill-black dark:fill-white shrink-0" />
            <span className="text-sm">Se Connecter</span>
          </li>
        </ul>
      )}
    </div>
  );
}
