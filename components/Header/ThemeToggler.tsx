import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-2 dark:bg-dark-bg absolute right-17 mr-1.5 flex cursor-pointer items-center justify-center rounded-full text-black dark:text-white lg:static"
    >
      <Moon
        className="dark:hidden w-5 h-5 md:w-6 md:h-6"
      />

      <Sun
        className="hidden dark:block w-5 h-5 md:w-6 md:h-6"
      />
    </button>
  );
};

export default ThemeToggler;
