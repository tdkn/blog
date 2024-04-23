import type { ComponentPropsWithoutRef, FC } from "react";

import type { Post } from "~/types/post";

import { Deprecated } from "~/components/common";
import { Link } from "~/components/ui";
import { formatDate } from "~/lib/format-date";

export type PostCardProps = {
  post: Post;
} & ComponentPropsWithoutRef<"article">;

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

export default PostCard;
