import { compareDesc } from "date-fns";

import { PostCard, Profile } from "~/components/common";
import { allPosts } from "~/lib/mdx";

function getPosts() {
  return allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
}

export default function HomePage() {
  const posts = getPosts();

  return (
    <>
      <Profile />
      <main className="pt-8">
        {posts.map((post, key) => (
          <PostCard key={key} post={post} />
        ))}
      </main>
    </>
  );
}
