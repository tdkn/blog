import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Deprecated, Profile } from "~/components/common";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import { allPosts } from "~/lib/mdx";

import Mdx from "./mdx";

type PageProps = {
  params: {
    slug: string;
    year: string;
  };
};

export function generateMetadata({
  params: { slug, year },
}: PageProps): Metadata {
  return {
    openGraph: { images: `/api/og/${year}/${slug}.png` },
    twitter: { images: `/api/og/${year}/${slug}.png` },
  };
}

export function generateStaticParams(): PageProps["params"][] {
  return allPosts.map(({ slug, year }) => ({ slug, year }));
}

function getPost(params: PageProps["params"]) {
  return allPosts.find(
    (post) => post.year === params.year && post.slug === params.slug,
  );
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPost(params);

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
      <Mdx code={post.content} />
      <Profile className="pt-10" />
    </>
  );
}
