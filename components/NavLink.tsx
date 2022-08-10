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
          className={`mt-4 p-2 flex rounded justify-center items-center first:mt-0 cursor-pointer xl:justify-start xl:self-stretch xl:mt-2 xl:mx-4 hover:bg-gray-100 dark:hover:bg-dark-300 ${
            isActive && "bg-gray-100 dark:bg-dark-300"
          }`}
        >
          {Icon ? (
            <Icon
              className={`w-[18px] h-[18px] ${
                isActive
                  ? "fill-marine-600 stroke-marine-600 dark:fill-marine-600 dark:stroke-marine-600"
                  : "fill-gray-600 stroke-gray-600 dark:fill-slate-300 dark:stroke-slate-300"
              }`}
            />
          ) : (
            <div className="w-[18px] h-[18px] bg-slate-300"></div>
          )}
          <span className="hidden ml-4 font-medium xl:block">{label}</span>
        </li>
      </Link>
    </>
  );
};

export default NavLink;
