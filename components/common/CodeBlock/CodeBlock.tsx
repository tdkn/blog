import styles from "./CodeBlock.module.css";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";

export interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  rootClassName?: string;
}

const CodeBlock = ({ rootClassName, ...props }: Props) => (
  <div className={clsx(styles.root, rootClassName)}>
    <pre {...props} />
  </div>
);

export default CodeBlock;
