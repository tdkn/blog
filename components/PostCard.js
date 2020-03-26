import React from "react";
import Link from "next/link";
import { DateTime } from "luxon";

const PostCard = ({ post }) => (
  <article className="py-5">
    <h2>
      <Link href={post.url}>
        <a>{post.title}</a>
      </Link>
    </h2>
    <p className="text-sm text-gray-600">
      {DateTime.fromISO(post.date).toRelative()}
    </p>
    <p>{post.summary}</p>
  </article>
);
export default PostCard;
