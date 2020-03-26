import React from "react";
import Link from "next/link";
import Logo from "~/components/Logo";
import styles from "~/styles/components/Header.module.css";

const BaseHeader = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  );
};

export default BaseHeader;
