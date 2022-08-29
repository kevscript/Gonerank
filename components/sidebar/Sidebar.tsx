import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CalendarIcon from "../Icons/Calendar";
import MatchIcon from "../Icons/Match";
import PlayerIcon from "../Icons/Player";
import RatingIcon from "../Icons/Rating";
import ShieldIcon from "../Icons/Shield";
import TrophyIcon from "../Icons/Trophy";
import UserIcon from "../Icons/User";
import LoggedInNavigation from "./LoggedInNavigation";
import LoggedOutNavigation from "./LoggedOutNavigation";
import NavLink from "./NavLink";
import GonerankLogo from "../shared/GonerankLogo";
import Spinner from "../shared/Spinner";
import Switcher from "../shared/Switcher";
import ThemeSwitcher from "../shared/ThemeSwitcher";

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
  { label: "Users", path: "/admin/users", Icon: UserIcon, type: "admin" },
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
    // if user is admin & path is admin
    // show admin navigation, else user navigation
    if (
      session?.user.role === "ADMIN" &&
      router.pathname.startsWith("/admin")
    ) {
      setNavigationType("admin");
    } else {
      setNavigationType("user");
    }
  }, [session, router]);

  return (
    <div className="fixed top-0 bottom-0 left-0 z-10 flex flex-col w-16 pt-8 pb-8 bg-white drop-shadow-sm items-cen xl:pb-0 xl:w-64 dark:bg-dark-500">
      {/* Sidebar Header */}
      <div className="flex flex-col items-center w-full xl:flex-row xl:justify-between xl:px-4">
        <div>
          <Link href="/" passHref>
            <div className="flex flex-row items-center cursor-pointer">
              <GonerankLogo />
              <div className="flex-col justify-center hidden h-8 ml-2 xl:flex">
                <span className="text-base font-medium leading-4">
                  Gonerank
                </span>
                <span className="font-mono text-xs font-thin leading-3 text-gray-600 dark:text-white">
                  @gonerank
                </span>
              </div>
            </div>
          </Link>
        </div>
        <div className="px-4 my-4 xl:px-0 xl:my-0 xl:mr-2">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Search bar */}
      {/* <div className="mt-8 p-2 flex justify-center items-center bg-gray-100 rounded-[10px] xl:self-stretch xl:mx-4 xl:justify-start cursor-pointer hover:bg-gray-200">
        <SearchIcon className="w-4 h-4 stroke-gray-600" />
        <div className="hidden ml-4 xl:block">
          <span>Search</span>
        </div>
      </div> */}

      {/* Sidebar Navigation */}
      <ul className="flex flex-col items-center flex-1 w-full mt-16">
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

      <div className="flex flex-col items-center justify-center xl:w-full xl:flex-row-reverse xl:justify-start xl:p-4">
        {/* Admin Routes Switch */}
        {session && session.user.role === "ADMIN" && (
          <div className="px-4 my-4 xl:px-0 xl:my-0 xl:mr-2">
            <Switcher
              checked={navigationType === "admin" ? true : false}
              id="navSwitcher"
              handleToggle={() =>
                setNavigationType((x) => (x === "user" ? "admin" : "user"))
              }
            />
          </div>
        )}
      </div>

      {/* User Navigation */}
      {status === "loading" ? (
        <div className="px-4 xl:w-full xl:py-4">
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
