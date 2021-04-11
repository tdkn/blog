import { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const DarkModeToggle = () => {
  const noop = () => {};
  const mockElement = {
    classList: {
      add: noop,
      remove: noop,
    },
  } as HTMLElement;
  const isClient = typeof document !== "undefined";
  const defaultElement = isClient ? document.documentElement : mockElement;
  const darkMode = useDarkMode(true, {
    element: defaultElement,
    classNameDark: "dark",
    classNameLight: "light",
  });
  const [icon, setIcon] = useState(faMoon);

  useEffect(() => {
    setIcon(darkMode.value ? faSun : faMoon);
  }, [darkMode.value]);

  return (
    <button
      className="focus:outline-none p-2 inline-flex hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
      type="button"
      onClick={darkMode.toggle}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default DarkModeToggle;
