import { compareDesc } from "date-fns";

import { PostCard } from "~/components/post-card";
import { Profile } from "~/components/profile";
import { ZennCard } from "~/components/zenn-card";
import { getAllPosts } from "~/lib/mdx";
import { getZennArticles } from "~/lib/zenn";

const HomePage = async () => {
  const [localPosts, zennData] = await Promise.all([getAllPosts(), getZennArticles()]);

  const sortedPosts = [...localPosts, ...zennData.posts].toSorted((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <>
      <Profile />
      <main className="flex flex-col gap-12 pt-10">
        <section>
          <div className="mb-5 flex items-end justify-between border-b pb-3">
            <h1 className="font-heading text-2xl font-semibold">Writing</h1>
          </div>
          <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {sortedPosts.map((post) =>
              post.source === "zenn" ? (
                <ZennCard key={`zenn-${post.slug}`} post={post} />
              ) : (
                <PostCard key={`local-${post.year}-${post.slug}`} post={post} />
              ),
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
