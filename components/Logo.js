import React from "react";
import styles from "~/styles/components/Logo.module.css";

const Logo = () => (
  <span className={styles.logo}>
    <svg viewBox="0 0 20 20" width="20" height="20">
      <circle cx="10" cy="10" r="10" fill="#FFC500" />
    </svg>
    <span>tdkn.dev</span>
  </span>
);

export default Logo;
