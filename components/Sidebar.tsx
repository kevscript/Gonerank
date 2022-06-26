import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CalendarIcon from "./Icons/Calendar";
import MatchIcon from "./Icons/Match";
import MoonIcon from "./Icons/Moon";
import PlayerIcon from "./Icons/Player";
import RatingIcon from "./Icons/Rating";
import ShieldIcon from "./Icons/Shield";
import TrophyIcon from "./Icons/Trophy";
import LoggedInNavigation from "./LoggedInNavigation";
import LoggedOutNavigation from "./LoggedOutNavigation";
import Spinner from "./Spinner";
import Switch from "./Switch";

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
  const [navigationType, setNavigationType] = useState<NavigationType>("user");

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
        {navigationType === "user" &&
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

        {navigationType === "admin" &&
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
        <div className="lg:w-full px-4 my-4 lg:my-2">
          <Switch
            isOn={navigationType === "admin" ? true : false}
            primary="bg-gray-400"
            secondary="bg-red-500"
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
