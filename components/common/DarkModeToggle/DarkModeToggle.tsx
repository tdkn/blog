import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [icon, setIcon] = useState(faMoon);
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setIcon(theme === "light" ? faMoon : faSun);
  }, [theme]);

  return (
    <button
      className="focus:outline-none p-2 inline-flex hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      type="button"
      onClick={toggle}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default DarkModeToggle;
