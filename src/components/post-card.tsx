import type { ComponentPropsWithoutRef, FC } from "react";

import { Deprecated } from "~/components/deprecated";
import { Link } from "~/components/link";
import { formatDate } from "~/lib/format-date";
import { cn } from "~/lib/utils";
import type { Post } from "~/types/post";

export type PostCardProps = ComponentPropsWithoutRef<"article"> & {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ className, post, ...otherProps }) => (
  <article className={cn("group pt-1 md:pt-4", className)} {...otherProps}>
    <Link
      className="block h-full text-foreground no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/50 hover:no-underline"
      href={post.url}
    >
      <div className="flex flex-col gap-2 pb-1 md:min-h-28 md:gap-3 md:pb-2">
        <div className="flex items-center justify-between gap-3 text-xs font-medium text-muted-foreground">
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
          {post.deprecated && <Deprecated />}
        </div>
        <h2
          className={cn(
            "text-base leading-relaxed font-semibold text-foreground md:line-clamp-3",
            "transition-colors group-hover:text-primary group-hover:underline group-hover:decoration-primary/50 group-hover:underline-offset-4",
          )}
        >
          {post.title}
        </h2>
      </div>
    </Link>
  </article>
);

export { PostCard };
