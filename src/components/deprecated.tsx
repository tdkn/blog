import type { ComponentPropsWithoutRef } from "react";

import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

const Deprecated = ({ className }: ComponentPropsWithoutRef<"span">) => (
  <Badge
    className={cn(
      "bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300",
      className,
    )}
    variant="secondary"
  >
    Deprecated
  </Badge>
);

export { Deprecated };
