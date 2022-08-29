import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switcher from "./shared/Switcher";

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
    <Switcher
      id="themeSwitcher"
      checked={theme === "dark" ? true : false}
      handleToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default ThemeSwitcher;
