import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import CalendarIcon from "./Icons/Calendar";
import MatchIcon from "./Icons/Match";
import MoonIcon from "./Icons/Moon";
import PlayerIcon from "./Icons/Player";
import RatingIcon from "./Icons/Rating";
import ShieldIcon from "./Icons/Shield";
import SignOutIcon from "./Icons/SignOut";
import TrophyIcon from "./Icons/Trophy";
import TwitterIcon from "./Icons/Twitter";
import UserIcon from "./Icons/User";
import LoggedInNavigation from "./LoggedInNavigation";
import LoggedOutNavigation from "./LoggedOutNavigation";

export type NavRoute = {
  label: string;
  path: string;
  Icon?: React.ElementType;
};

const userRoutes: NavRoute[] = [
  { label: "Home", path: "/", Icon: RatingIcon },
  { label: "Players", path: "/players", Icon: PlayerIcon },
  { label: "Matches", path: "/matches", Icon: MatchIcon },
];

const adminRoutes: NavRoute[] = [
  { label: "Matches", path: "/admin/", Icon: MatchIcon },
  { label: "Players", path: "/admin/players", Icon: PlayerIcon },
  { label: "Clubs", path: "/admin/clubs", Icon: ShieldIcon },
  { label: "Seasons", path: "/admin/seasons", Icon: CalendarIcon },
  { label: "Competitions", path: "/admin/competitions", Icon: TrophyIcon },
];

type NavigationType = "user" | "admin";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [navigation, setNavigation] = useState<NavigationType>("user");

  const [expandMenu, setExpandMenu] = useState(false);
  const userMenuRef = useRef(null);

  const loginHandler = () => (session ? signOut() : signIn("twitter"));

  // useOutsideClick is a useEffect
  useOutsideClick({ ref: userMenuRef, action: () => setExpandMenu(false) });

  return (
    <div className="sticky top-0 w-16 h-screen bg-white border-r-[2px] border-gray-100 pt-8 pb-8 lg:pb-0 flex flex-col items-center lg:w-1/6 lg:max-w-[256px]">
      {/* Sidebar Header */}
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between lg:px-4">
        <Link href="/" passHref>
          <div className="flex flex-row items-center cursor-pointer">
            <span className="text-lg font-black">GR</span>
            <div className="hidden w-[1px] h-4 bg-black mx-2 lg:block"></div>
            <span className="hidden lg:block">Gonerank</span>
          </div>
        </Link>
        <MoonIcon className="w-4 h-4 mt-4 lg:mt-0" />
      </div>

      {/* Sidebar Navigation */}
      <ul className="w-full mt-16 flex-1 flex flex-col items-center">
        {navigation === "user" &&
          userRoutes.map(({ label, path, Icon }) => (
            <Link key={label} href={path} passHref>
              <li className="mt-8 first:mt-0 flex items-center cursor-pointer lg:w-full lg:px-4 lg:py-4 lg:mt-0 hover:bg-gray-200">
                {Icon ? (
                  <Icon className="w-6 h-6 lg:w-5 lg:h-5" />
                ) : (
                  <div className="w-6 h-6 bg-slate-300"></div>
                )}
                <span className="hidden font-medium ml-4 lg:block">
                  {label}
                </span>
              </li>
            </Link>
          ))}

        {navigation === "admin" &&
          adminRoutes.map(({ label, path, Icon }) => (
            <Link key={label} href={path} passHref>
              <li className="mt-8 first:mt-0 flex items-center cursor-pointer lg:w-full lg:px-4 lg:py-4 lg:mt-0 hover:bg-gray-200">
                {Icon ? (
                  <Icon className="w-6 h-6 lg:w-5 lg:h-5" />
                ) : (
                  <div className="w-6 h-6 bg-slate-300"></div>
                )}
                <span className="hidden font-medium ml-4 lg:block">
                  {label}
                </span>
              </li>
            </Link>
          ))}
      </ul>

      {/* Admin Routes Switch */}
      {session && session.user.role === "ADMIN" && (
        <div
          className={`w-8 h-4 rounded-full mt-8 mb-4 transition-colors cursor-pointer ${
            navigation === "user" ? "bg-blue-600" : "bg-orange-400"
          }`}
          onClick={() =>
            setNavigation((n) => (n === "user" ? "admin" : "user"))
          }
        ></div>
      )}

      {/* User Navigation */}
      {status === "loading" ? null : status === "authenticated" ? (
        <LoggedInNavigation user={session.user} />
      ) : (
        <LoggedOutNavigation />
      )}
    </div>
  );
};

export default Sidebar;
