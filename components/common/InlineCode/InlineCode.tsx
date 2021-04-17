import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./InlineCode.module.css";

export type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

const InlineCode = ({ className, ...props }: Props) => (
  <code className={clsx(styles.root, className)} {...props} />
);

export default InlineCode;
