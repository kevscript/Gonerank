import Link from "next/link";
import { Fragment } from "react";
import CrumbIcon from "../Icons/Crumb";

export type BreadcrumbsProps = {
  crumbs: Crumb[];
};

type Crumb = {
  label: string;
  path: string;
};

const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  return (
    <div className="items-center hidden w-full md:flex flex-nowrap md:px-4 md:py-8 lg:px-8 2xl:px-16">
      {crumbs &&
        crumbs.map((crumb, i) => (
          <Fragment key={crumb.label + i}>
            {i !== 0 && (
              <CrumbIcon className="w-3 h-3 mx-4 fill-gray-700 dark:fill-gray-300" />
            )}
            <Link href={`${crumb.path}`}>
              <a className="text-sm text-gray-600 no-underline dark:text-gray-300 hover:underline hover:text-black dark:hover:text-white underline-offset-4">
                {crumb.label}
              </a>
            </Link>
          </Fragment>
        ))}
    </div>
  );
};

export default Breadcrumbs;
