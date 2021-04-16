import React from "react";
import { Link } from "~/components/ui";
import { formatDate } from "~/lib/format-date";
import type { Post } from "~/types";

export interface Props {
  post: Post;
}

const PostCard: React.VFC<Props> = ({ post }) => (
  <article className="py-3">
    <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
    <h2>
      <Link href={post.url}>{post.title}</Link>
    </h2>
  </article>
);

export default PostCard;
