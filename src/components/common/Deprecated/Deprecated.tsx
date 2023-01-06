import { ComponentPropsWithoutRef } from "react";
import { classNames } from "~/lib/style";

const Deprecated = ({ className }: ComponentPropsWithoutRef<"span">) => (
  <span
    className={classNames(
      "inline-flex items-center rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-100/20 dark:text-orange-500",
      className
    )}
  >
    Deprecated
  </span>
);

export default Deprecated;
