import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { PostCard, Profile } from "~/components/common";

function getPosts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return posts;
}

export default function HomePage() {
  const posts = getPosts();

  return (
    <>
      <Profile />
      <main className="pt-8">
        {posts.map((post, key) => (
          <PostCard post={post} key={key} />
        ))}
      </main>
    </>
  );
}
