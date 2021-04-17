import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./DarkModeToggle.module.css";

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
    <button className={styles.root} type="button" onClick={toggle}>
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default DarkModeToggle;
