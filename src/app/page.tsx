import { PostCard, Profile } from "~/components/common";
import { getAllPosts } from "~/lib/mdx";

export default async function HomePage() {
  const posts = await getAllPosts();

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
