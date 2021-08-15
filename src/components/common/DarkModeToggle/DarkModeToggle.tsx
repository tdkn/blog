import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [icon, setIcon] = useState(faMoon);

  useEffect(() => {
    setIcon(colorMode === "light" ? faMoon : faSun);
  }, [colorMode]);

  return (
    <IconButton
      type="button"
      variant="ghost"
      aria-label="Dark Mode Toggle"
      icon={
        <Icon
          as={FontAwesomeIcon}
          icon={icon}
          display="block"
          transition="color 0.2s"
        />
      }
      onClick={toggleColorMode}
    />
  );
};

export default DarkModeToggle;
