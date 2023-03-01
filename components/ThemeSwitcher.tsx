import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
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
    <label
      htmlFor="themeSwitcher"
      className="relative flex items-center cursor-pointer"
    >
      <span className="sr-only" aria-label="themeSwitcher">
        Theme Switcher
      </span>
      <input
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        defaultChecked={theme === "dark" ? true : false}
        type="checkbox"
        id="themeSwitcher"
        className={`sr-only peer after:checked:translate-x-full checked:after:border-white checked:after:left-1.5`}
      />
      <div className="absolute flex items-center justify-center w-4 h-4 transition-transform bg-yellow-300 border-2 border-yellow-400 rounded-full peer-checked:bg-marine-500 peer-checked:translate-x-full peer-checked:border-marine-600"></div>

      <div
        className={`border-2 h-4 w-8 rounded-full ${
          theme === "dark"
            ? "bg-marine-400 border-marine-600"
            : "bg-gray-100 border-gray-300"
        }`}
      ></div>
    </label>
  );
};

export default ThemeSwitcher;
