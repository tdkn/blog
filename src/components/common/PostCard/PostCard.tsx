import type { Post } from "contentlayer/generated";
import type { ComponentPropsWithoutRef, FC } from "react";
import { Link } from "~/components/ui";
import { formatDate } from "~/lib/format-date";

export type PostCardProps = ComponentPropsWithoutRef<"article"> & {
  post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => (
  <article className="py-5">
    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
      {formatDate(post.date)}
    </div>
    <Link href={post.url}>
      <h2 className="text-xl font-bold text-black dark:text-yellow-200">
        {post.title}
      </h2>
    </Link>
  </article>
);

export default PostCard;
