import NextLink from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

import { classNames } from "~/lib/style";

const Link: FC<ComponentPropsWithoutRef<typeof NextLink>> = ({
  className,
  ...otherProps
}) => (
  <NextLink
    className={classNames("dark:text-yellow-200", className)}
    {...otherProps}
  />
);

export default Link;
