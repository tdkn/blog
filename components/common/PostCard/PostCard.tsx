import { Link } from "~/components/ui";
import { DateTime } from "luxon";

const PostCard = ({ post }) => (
  <article className="py-3">
    <p className="text-sm text-gray-500">
      {DateTime.fromISO(post.date).toRelative()}
    </p>
    <h2>
      <Link href={post.url}>{post.title}</Link>
    </h2>
  </article>
);

export default PostCard;
