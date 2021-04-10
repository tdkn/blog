import styles from "./CodeBlock.module.css";

const CodeBlock = (props) => (
  <div className={styles.root}>
    <pre {...props} />
  </div>
);

export default CodeBlock;
