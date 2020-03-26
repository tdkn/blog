import React from "react";
import styles from "~/styles/components/Footer.module.css";

const BaseFooter = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href="https://github.com/tdkn">GitHub</a>
        </li>
        <li>
          <a href="https://twitter.com/tdkn_">Twitter</a>
        </li>
        <li>
          <a href="https://facebook.com/ted0k0n">Facebook</a>
        </li>
      </ul>
    </footer>
  );
};

export default BaseFooter;
