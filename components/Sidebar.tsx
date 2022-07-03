import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CalendarIcon from "./Icons/Calendar";
import DashIcon from "./Icons/Dash";
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

export type NavigationType = "user" | "admin";

export type NavRoute = {
  label: string;
  path: string;
  Icon?: React.ElementType;
  type: NavigationType;
};

const navRoutes: NavRoute[] = [
  { label: "Evaluation", path: "/", Icon: RatingIcon, type: "user" },
  { label: "Joueurs", path: "/players", Icon: PlayerIcon, type: "user" },
  { label: "Matchs", path: "/matches", Icon: MatchIcon, type: "user" },
  { label: "Dashboard", path: "/admin", Icon: DashIcon, type: "admin" },
  { label: "Joueurs", path: "/admin/players", Icon: PlayerIcon, type: "admin" },
  { label: "Matchs", path: "/admin/matches", Icon: MatchIcon, type: "admin" },
  { label: "Clubs", path: "/admin/clubs", Icon: ShieldIcon, type: "admin" },
  {
    label: "Saisons",
    path: "/admin/seasons",
    Icon: CalendarIcon,
    type: "admin",
  },
  {
    label: "Competitions",
    path: "/admin/competitions",
    Icon: TrophyIcon,
    type: "admin",
  },
];

const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [navigationType, setNavigationType] = useState<NavigationType>("user");

  const isPathActive = (path: string) => {
    const currentPath = router.pathname;
    if (path === "/" || path === "/admin") {
      return currentPath === path ? true : false;
    } else {
      return currentPath.startsWith(path) ? true : false;
    }
  };

  useEffect(() => {
    session && console.log(session.user);
  }, [session]);

  return (
    <div className="sticky top-0 w-16 h-screen bg-white border-r-[2px] border-gray-100 pt-8 pb-8 lg:pb-0 flex flex-col items-center lg:w-1/4 lg:max-w-[256px]">
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
        {navRoutes
          .filter((r) => r.type === navigationType)
          .map((route) => (
            <NavLink
              key={route.label}
              isActive={isPathActive(route.path)}
              {...route}
            />
          ))}
      </ul>

      <div className="flex flex-col justify-center items-center lg:w-full lg:flex-row-reverse lg:justify-start lg:p-4">
        {/* Darmode Selector */}
        <MoonIcon className="w-4 h-4 my-4 lg:my-0 cursor-pointer" />

        {/* Admin Routes Switch */}
        {session && session.user.role === "ADMIN" && (
          <div className="px-4 my-4 lg:px-0 lg:my-0 lg:mr-2">
            <Switcher
              checked={navigationType === "admin" ? true : false}
              handleToggle={() =>
                setNavigationType((x) => (x === "user" ? "admin" : "user"))
              }
            />
          </div>
        )}
      </div>

      {/* User Navigation */}
      {status === "loading" ? (
        <div className="lg:w-full px-4 lg:py-4">
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
