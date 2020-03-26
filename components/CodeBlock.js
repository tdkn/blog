import React from "react";
import styles from "~/styles/components/CodeBlock.module.css";

const CodeBlock = props => (
  <div className={styles.code}>
    <pre {...props} />
  </div>
);

export default CodeBlock;
