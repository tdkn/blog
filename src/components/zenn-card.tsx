import type { ComponentPropsWithoutRef, FC } from "react";

import { ExternalLinkIcon } from "lucide-react";

import { Link } from "~/components/link";
import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/lib/format-date";
import { cn } from "~/lib/utils";
import type { Post } from "~/types/post";

export type ZennCardProps = ComponentPropsWithoutRef<"article"> & {
  post: Post;
};

const ZennCard: FC<ZennCardProps> = ({ className, post, ...otherProps }) => (
  <article className={cn("group pt-1 md:pt-4", className)} {...otherProps}>
    <Link
      className="block h-full text-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/50 hover:no-underline"
      href={post.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex flex-col gap-2 pb-1 md:min-h-28 md:gap-3 md:pb-2">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
          <Badge
            className="h-4 rounded-md border-[#3EA8FF]/10 bg-[#3EA8FF]/15 px-1.5 py-0 text-[10px] leading-none text-[#147EAD] dark:border-[#3EA8FF]/20 dark:bg-[#3EA8FF]/20 dark:text-[#8FD7FF] [&>svg]:size-2.5!"
            variant="secondary"
          >
            <span>Zenn</span>
            <ExternalLinkIcon data-icon="inline-end" aria-hidden="true" />
          </Badge>
        </div>
        <h2
          className={cn(
            "text-base leading-relaxed font-semibold text-foreground md:line-clamp-3",
            "transition-colors group-hover:text-primary group-hover:underline group-hover:decoration-primary/50 group-hover:underline-offset-4",
          )}
        >
          {typeof post.emoji === "string" && post.emoji.length > 0 && (
            <span className="mr-1.5 inline-block leading-none" aria-hidden="true">
              {post.emoji}
            </span>
          )}
          {post.title}
        </h2>
      </div>
    </Link>
  </article>
);

export { ZennCard };
