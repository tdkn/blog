import NextLink from "next/link";
import { Logo } from "~/components/ui";
import { DarkModeToggle } from "~/components/common";
import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.root}>
    <NextLink href="/">
      <a>
        <Logo />
      </a>
    </NextLink>
    <DarkModeToggle />
  </header>
);

export default Header;
