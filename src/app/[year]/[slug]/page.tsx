import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Deprecated, Profile } from "~/components/common";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import Mdx from "./mdx";

type PageProps = {
  params: {
    year: string;
    slug: string;
  };
};

export function generateMetadata({
  params: { year, slug },
}: PageProps): Metadata {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://tdkn.dev/api/og/${year}/${slug}.png`
      : `http://localhost:3000/api/og/${year}/${slug}.png`;

  return {
    openGraph: { images: [{ url }] },
    twitter: { images: [{ url }] },
  };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPosts.map((post) => {
    const [year, slug] = post._raw.flattenedPath.split("/");
    return {
      year,
      slug,
    };
  });
}

async function getPost(params: PageProps["params"]) {
  return allPosts.find(
    (post) => `/${post._raw.flattenedPath}` === `/${params.year}/${params.slug}`
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="pb-2">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="flex items-center space-x-2 py-8">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.date)} ({formatTimeAgo(post.date)})
          </span>
          {post.deprecated && <Deprecated />}
        </p>
      </div>
      <Mdx code={post.body.code} />
      <Profile className="pt-10" />
    </>
  );
}
