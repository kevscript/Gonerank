import { useRef, useState } from "react";
import Image from "next/image";
import UserIcon from "../Icons/User";
import { signOut } from "next-auth/react";
import useOutsideClick from "@/hooks/useOutsideClick";
import SignOutIcon from "../Icons/SignOut";
import { Session } from "next-auth";

export function LoggedInMobile({ user }: { user: Session["user"] }) {
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
      </button>
      {isOpen && (
        <ul className="z-50 absolute right-0 overflow-hidden bg-white dark:bg-black border dark:border-dark-300 rounded top-10 min-w-[8rem] p-1 w-max">
          <li
            className="flex items-center gap-2 p-2 overflow-hidden rounded-sm cursor-pointer hover:bg-neutral-100 dark:hover:bg-dark-500"
            role="menuitem"
            onClick={() => signOut()}
          >
            <SignOutIcon className="w-3 h-3 fill-black dark:fill-white shrink-0" />

            <span className="text-sm">Se Déconnecter</span>
          </li>
        </ul>
      )}
    </div>
  );
}
