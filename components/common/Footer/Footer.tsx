import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.root}>
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

export default Footer;
