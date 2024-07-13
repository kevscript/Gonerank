import Link from "next/link";
import { NavRoute } from "../sidebar/Sidebar";

export type NavLinkMobileProps = NavRoute & {
  isActive: boolean;
};

const NavLinkMobile = ({ label, path, Icon, isActive }: NavLinkMobileProps) => {
  return (
    <>
      <Link href={path} passHref>
        <li
          className={`p-2 flex rounded items-center first:mt-0 cursor-pointer justify-start self-stretch mt-2 mx-4 hover:bg-gray-100 dark:hover:bg-dark-300 ${
            isActive && "bg-gray-100 dark:bg-dark-300"
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
          <span className="ml-4 font-medium">{label}</span>
        </li>
      </Link>
    </>
  );
};

export default NavLinkMobile;
