import React from "react";
import Image from "next/image";
import cx from "clsx";
import styles from "./Avatar.module.css";

export interface Props {
  className?: string;
}

const Avatar: React.VFC<Props> = ({ className }) => (
  <div className={cx(styles.root, className)}>
    <Image src="/avatar.jpg" alt="Avatar" layout="fill" objectFit="cover" />
  </div>
);

export default Avatar;
