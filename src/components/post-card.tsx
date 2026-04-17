import type { ComponentPropsWithoutRef, FC } from "react";

import { Deprecated } from "~/components/deprecated";
import { Link } from "~/components/link";
import { formatDate } from "~/lib/format-date";
import type { Post } from "~/types/post";

export type PostCardProps = ComponentPropsWithoutRef<"article"> & {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => (
  <article className="py-5">
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {formatDate(post.date)}
      </div>
      {post.deprecated && <Deprecated />}
    </div>
    <Link href={post.url}>
      <h2 className="text-xl font-bold text-black dark:text-yellow-200">
        {post.title}
      </h2>
    </Link>
  </article>
);

export { PostCard };
