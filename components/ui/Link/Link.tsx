import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import clsx from "clsx";

export interface LinkProps extends NextLinkProps {
  className?: string;
}

const Link: React.FC<LinkProps> = ({ href, className, children, ...props }) => {
  return (
    <NextLink href={href}>
      <a
        className={clsx(
          "font-bold text-gray-700 dark:text-yellow-200 no-underline hover:text-black dark:hover:text-yellow-300",
          className
        )}
        {...props}
      >
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
