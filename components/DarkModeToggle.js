import React, { useEffect, useState } from "react";
import useDarkMode from "use-dark-mode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeToggle = () => {
  const noop = () => {};
  const mockElement = {
    classList: {
      add: noop,
      remove: noop
    }
  };
  const isClient = typeof document !== "undefined";
  const defaultElement = isClient ? document.documentElement : mockElement;
  const darkMode = useDarkMode(true, { element: defaultElement });
  const [icon, setIcon] = useState("moon");

  useEffect(() => {
    setIcon(darkMode.value ? "sun" : "moon");
  }, [darkMode.value]);

  return (
    <button
      className="focus:outline-none p-2 inline-flex"
      type="button"
      onClick={darkMode.toggle}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default DarkModeToggle;
