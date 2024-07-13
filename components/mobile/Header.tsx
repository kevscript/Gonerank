import { Burger } from "./Burger";
import GonerankLogo from "../shared/GonerankLogo";
import ThemeToggler from "../ThemeToggler";
import { UserMobile } from "./UserMobile";
import { useEffect, useState } from "react";
import { NavigationType, navRoutes } from "../sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import NavLinkMobile from "./NavLinkMobile";
import UserIcon from "../Icons/User";
import ShieldIcon from "../Icons/Shield";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
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

  function toggleOpen() {
    setIsOpen((x) => !x);
  }

  function toggleNavigationType() {
    setNavigationType((nav) => (nav === "user" ? "admin" : "user"));
  }

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    function closeOnResize() {
      if (window && window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-between w-full h-16 px-4 bg-white dark:bg-dark-500 lg:hidden">
        <div className="flex items-center justify-center gap-4">
          <div onClick={toggleOpen}>
            <Burger />
          </div>
          <GonerankLogo />
        </div>
        <div className="flex items-center justify-center gap-4">
          <ThemeToggler />

          <UserMobile />
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-neutral-600/80 dark:bg-black/80"
            onClick={toggleOpen}
          ></div>
          <div className="fixed top-0 bottom-0 left-0 z-50 w-64 bg-white dark:bg-dark-600">
            {session && session.user.role === "ADMIN" && (
              <div className="w-full p-2">
                <div
                  className="w-8 h-8 p-1.5 overflow-hidden flex justify-center items-center rounded-full cursor-pointer dark:bg-dark-600 bg-neutral-100"
                  onClick={toggleNavigationType}
                >
                  {navigationType === "user" ? (
                    <ShieldIcon className="fill-black dark:fill-white" />
                  ) : (
                    <UserIcon className="fill-black dark:fill-white" />
                  )}
                </div>
              </div>
            )}

            {/* Sidebar Navigation */}
            <ul className="flex flex-col items-center flex-1 w-full mt-8">
              {navRoutes
                .filter((r) => r.type === navigationType)
                .map((route) => (
                  <NavLinkMobile
                    key={route.label}
                    isActive={isPathActive(route.path)}
                    {...route}
                  />
                ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
