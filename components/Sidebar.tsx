import Link from "next/link";
import { useState } from "react";
import MoonIcon from "./Icons/Moon";

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
  const [navigation, setNavigation] = useState<NavigationType>("user");

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
      <div
        className={`w-8 h-4 rounded-full mt-8 transition-colors cursor-pointer ${
          navigation === "user" ? "bg-blue-600" : "bg-orange-400"
        }`}
        onClick={() => setNavigation((n) => (n === "user" ? "admin" : "user"))}
      ></div>
      <div className="w-8 h-8 rounded-full bg-slate-300 mt-8"></div>
    </div>
  );
};

export default Sidebar;
