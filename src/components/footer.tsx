import { getYear } from "date-fns";
import type { ComponentPropsWithoutRef, FC } from "react";

import { cn } from "~/lib/utils";

const Footer: FC<ComponentPropsWithoutRef<"footer">> = ({ className }) => (
  <footer className={cn("py-20 text-center text-sm text-muted-foreground", className)}>
    Copyright © {getYear(new Date())} Shun Tedokon.
  </footer>
);

export { Footer };
