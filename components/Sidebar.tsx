import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import MoonIcon from "./Icons/Moon";
import SignOutIcon from "./Icons/SignOut";
import TwitterIcon from "./Icons/Twitter";
import UserIcon from "./Icons/User";

export type NavRoute = {
  label: string;
  path: string;
};

const userRoutes: NavRoute[] = [
  { label: "Home", path: "/" },
  { label: "Players", path: "/players" },
  { label: "Matches", path: "/matches" },
];

const adminRoutes: NavRoute[] = [
  { label: "Matches", path: "/admin/" },
  { label: "Players", path: "/admin/players" },
  { label: "Clubs", path: "/admin/clubs" },
  { label: "Seasons", path: "/admin/seasons" },
  { label: "Competitions", path: "/admin/competitions" },
];

type NavigationType = "user" | "admin";

const Sidebar = () => {
  const { data: session } = useSession();
  const [navigation, setNavigation] = useState<NavigationType>("user");

  const [expandMenu, setExpandMenu] = useState(false);
  const userMenuRef = useRef(null);

  const loginHandler = () => (session ? signOut() : signIn("twitter"));

  // useOutsideClick is a useEffect
  useOutsideClick({ ref: userMenuRef, action: () => setExpandMenu(false) });

  return (
    <div className="sticky top-0 w-16 h-screen bg-white border-r-[1px] border-gray-100 py-8 flex flex-col items-center">
      <Link href="/" passHref>
        <div className=" flex flex-row items-center cursor-pointer">
          <span className="text-lg font-black">GR</span>
          <span className="mx-1 hidden">|</span>
          <span className="hidden">Gonerank</span>
        </div>
      </Link>

      <MoonIcon className="w-4 h-4 mt-4" />
      <ul className="w-full mt-16 flex-1 flex flex-col items-center">
        {navigation === "user" &&
          userRoutes.map((r) => (
            <Link key={r.label} href={r.path} passHref>
              <li className="mt-8 first:mt-0 flex">
                <div className="w-6 h-6 bg-slate-300"></div>
                <span className="hidden font-medium ml-4">{r.label}</span>
              </li>
            </Link>
          ))}

        {navigation === "admin" &&
          adminRoutes.map((r) => (
            <Link key={r.label} href={r.path} passHref>
              <li className="mt-8 first:mt-0 flex">
                <div className="w-6 h-6 bg-slate-300"></div>
                <span className="hidden font-medium ml-4">{r.label}</span>
              </li>
            </Link>
          ))}
      </ul>

      {session && session.user.role === "ADMIN" && (
        <div
          className={`w-8 h-4 rounded-full mt-8 transition-colors cursor-pointer ${
            navigation === "user" ? "bg-blue-600" : "bg-orange-400"
          }`}
          onClick={() =>
            setNavigation((n) => (n === "user" ? "admin" : "user"))
          }
        ></div>
      )}

      <div ref={userMenuRef} className="relative mt-4">
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden flex justify-center items-center shadow-inner"
          onClick={() => setExpandMenu((x) => !x)}
        >
          {session ? (
            <Image
              src={session.user.image!}
              alt="user avatar"
              layout="fill"
              objectFit="contain"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-end shadow-inner">
              <UserIcon className="w-6 h-6 fill-gray-400" />
            </div>
          )}
        </div>
        {expandMenu && (
          <div
            className="absolute top-0 left-9 h-8 flex px-2 border border-gray-200 bg-white rounded text-sm font-medium justify-center items-center drop-shadow cursor-pointer"
            onClick={() => loginHandler()}
          >
            {session ? (
              <span className="flex justify-center items-center">
                Déconnexion <SignOutIcon className="ml-2 w-4 h-4" />
              </span>
            ) : (
              <span className="flex justify-center items-center">
                Connexion <TwitterIcon className="ml-2 w-3 h-3 fill-sky-600" />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
