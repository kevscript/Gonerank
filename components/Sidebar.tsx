import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CalendarIcon from "./Icons/Calendar";
import MatchIcon from "./Icons/Match";
import MoonIcon from "./Icons/Moon";
import PlayerIcon from "./Icons/Player";
import RatingIcon from "./Icons/Rating";
import SearchIcon from "./Icons/Search";
import ShieldIcon from "./Icons/Shield";
import TrophyIcon from "./Icons/Trophy";
import LoggedInNavigation from "./LoggedInNavigation";
import LoggedOutNavigation from "./LoggedOutNavigation";
import NavLink from "./NavLink";
import GonerankLogo from "./shared/GonerankLogo";
import Spinner from "./shared/Spinner";
import Switcher from "./shared/Switcher";

export type NavRoute = {
  label: string;
  path: string;
  Icon?: React.ElementType;
};

const userRoutes: NavRoute[] = [
  { label: "Evaluation", path: "/", Icon: RatingIcon },
  { label: "Joueurs", path: "/players", Icon: PlayerIcon },
  { label: "Matchs", path: "/matches", Icon: MatchIcon },
];

const adminRoutes: NavRoute[] = [
  { label: "Matchs", path: "/admin/", Icon: MatchIcon },
  { label: "Joueurs", path: "/admin/players", Icon: PlayerIcon },
  { label: "Clubs", path: "/admin/clubs", Icon: ShieldIcon },
  { label: "Saisons", path: "/admin/seasons", Icon: CalendarIcon },
  { label: "Competitions", path: "/admin/competitions", Icon: TrophyIcon },
];

type NavigationType = "user" | "admin";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const [navigationType, setNavigationType] = useState<NavigationType>("user");

  return (
    <div className="sticky top-0 w-16 h-screen bg-white  border-r-[2px] border-gray-100 pt-8 pb-8 lg:pb-0 flex flex-col items-center lg:w-1/5 lg:max-w-[256px]">
      {/* Sidebar Header */}
      <div className="w-full flex flex-col items-center lg:flex-row lg:justify-between lg:px-4">
        <Link href="/" passHref>
          <div className="flex flex-row items-center cursor-pointer">
            <GonerankLogo />
            <div className="hidden lg:flex flex-col justify-center h-8 ml-2">
              <span className="text-base font-medium leading-4">Gonerank</span>
              <span className="text-xs font-mono font-thin text-gray-600 leading-3">
                @kevscript
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Search bar */}
      <div className="mt-8 p-2 flex justify-center items-center bg-gray-100 rounded-[10px] lg:self-stretch lg:mx-4 lg:justify-start cursor-pointer hover:bg-gray-200">
        <SearchIcon className="w-4 h-4 stroke-gray-600" />
        <div className="hidden lg:block ml-4">
          <span>Search</span>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <ul className="w-full mt-8 flex-1 flex flex-col items-center">
        {navigationType === "user" &&
          userRoutes.map((navRoute) => (
            <NavLink key={navRoute.label} {...navRoute} />
          ))}

        {navigationType === "admin" &&
          adminRoutes.map((navRoute) => (
            <NavLink key={navRoute.label} {...navRoute} />
          ))}
      </ul>

      <MoonIcon className="w-4 h-4 mt-4 lg:mt-0" />

      {/* Admin Routes Switch */}
      {session && session.user.role === "ADMIN" && (
        <div className="lg:w-full px-4 my-4 lg:my-2">
          <Switcher
            checked={navigationType === "admin" ? true : false}
            handleToggle={() =>
              setNavigationType((x) => (x === "user" ? "admin" : "user"))
            }
          />
        </div>
      )}

      {/* User Navigation */}
      {status === "loading" ? (
        <div className="lg:w-full p-4">
          <Spinner />
        </div>
      ) : status === "authenticated" ? (
        <LoggedInNavigation user={session.user} />
      ) : (
        <LoggedOutNavigation />
      )}
    </div>
  );
};

export default Sidebar;
