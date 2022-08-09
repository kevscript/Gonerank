import Link from "next/link";
import { NavRoute } from "./Sidebar";

export type NavLinkProps = NavRoute & {
  isActive: boolean;
};

const NavLink = ({ label, path, Icon, isActive }: NavLinkProps) => {
  return (
    <>
      <Link href={path} passHref>
        <li
          className={`mt-4 p-2 flex rounded justify-center items-center first:mt-0 cursor-pointer lg:justify-start lg:self-stretch lg:mt-2 lg:mx-4 hover:bg-gray-100 dark:hover:bg-slate-800 ${
            isActive && "bg-gray-100 dark:bg-slate-800"
          }`}
        >
          {Icon ? (
            <Icon
              className={`w-[18px] h-[18px] ${
                isActive
                  ? "fill-marine-600 stroke-marine-600 dark:fill-marine-500 dark:stroke-marine-500"
                  : "fill-gray-600 stroke-gray-600 dark:fill-slate-300 dark:stroke-slate-300"
              }`}
            />
          ) : (
            <div className="w-[18px] h-[18px] bg-slate-300"></div>
          )}
          <span className="hidden ml-4 font-medium lg:block">{label}</span>
        </li>
      </Link>
    </>
  );
};

export default NavLink;
