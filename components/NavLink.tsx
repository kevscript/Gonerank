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
          className={`mt-4 p-2 flex rounded justify-center items-center first:mt-0 cursor-pointer lg:justify-start lg:self-stretch lg:mt-2 lg:mx-4 hover:bg-gray-100 ${
            isActive && "bg-gray-100"
          }`}
        >
          {Icon ? (
            <Icon
              className={`w-[18px] h-[18px] ${
                isActive
                  ? "fill-marine-600 stroke-marine-600"
                  : "fill-gray-600 stroke-gray-600"
              }`}
            />
          ) : (
            <div className="w-[18px] h-[18px] bg-slate-300"></div>
          )}
          <span className="hidden font-medium ml-4 lg:block">{label}</span>
        </li>
      </Link>
    </>
  );
};

export default NavLink;
