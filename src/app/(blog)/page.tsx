import { compareDesc } from "date-fns";

import { PostCard, Profile, ZennCard } from "~/components/common";
import { getAllPosts } from "~/lib/mdx";
import { getZennArticles } from "~/lib/zenn";

export default async function HomePage() {
  const [localPosts, zennData] = await Promise.all([
    getAllPosts(),
    getZennArticles(),
  ]);

  const sortedLocalPosts = localPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const sortedZennPosts = zennData.posts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  return (
    <>
      <Profile />
      <main className="space-y-6 pt-8">
        {/* Local Blog Posts */}
        <section className="space-y-0">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Posts
          </h1>
          {sortedLocalPosts.map((post, key) => (
            <PostCard key={key} post={post} />
          ))}
        </section>

        {/* Zenn Articles */}
        {sortedZennPosts.length > 0 && (
          <>
            <h1 className="mt-12 mb-6 text-2xl font-bold text-gray-900 dark:text-white">
              Elsewhere
            </h1>
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sortedZennPosts.map((post, key) => {
                const zennArticle = zennData.articlesData.find(
                  (article) => article.slug === post.slug,
                );
                return (
                  <ZennCard key={key} post={post} zennData={zennArticle} />
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}
