import NextLink from "next/link";
import type { ComponentPropsWithoutRef, FC } from "react";

import { cn } from "~/lib/utils";

const Link: FC<ComponentPropsWithoutRef<typeof NextLink>> = ({ className, ...otherProps }) => (
  <NextLink
    className={cn("text-primary underline-offset-4 hover:underline", className)}
    {...otherProps}
  />
);

export { Link };
