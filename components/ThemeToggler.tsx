import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "./Icons/Sun";
import MoonIcon from "./Icons/Moon";

const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 p-1.5 flex justify-center items-center rounded-full cursor-pointer dark:bg-dark-600 bg-neutral-100"
    >
      {theme === "dark" ? (
        <MoonIcon className="fill-white" />
      ) : (
        <SunIcon className="fill-black" />
      )}
    </div>
  );
};

export default ThemeToggler;
