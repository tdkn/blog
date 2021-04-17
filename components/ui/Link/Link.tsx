import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import clsx from "clsx";
import styles from "./Link.module.css";

export interface LinkProps extends NextLinkProps {
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a className={clsx(styles.root, className)} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
