import { getYear } from "date-fns";
import type { ComponentPropsWithoutRef, FC } from "react";

import { classNames } from "~/lib/style";

const Footer: FC<ComponentPropsWithoutRef<"footer">> = ({ className }) => (
  <footer className={classNames("py-20 text-center text-sm text-gray-500", className)}>
    Copyright © {getYear(new Date())} Shun Tedokon.
  </footer>
);

export { Footer };
