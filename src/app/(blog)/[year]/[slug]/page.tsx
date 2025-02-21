import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Deprecated, Profile } from "~/components/common";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import { getAllPosts } from "~/lib/mdx";

import Mdx from "./mdx";

type PageProps = {
  params: Promise<{
    slug: string;
    year: string;
  }>;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;

  const { slug, year } = params;

  return {
    openGraph: { images: `/api/og/${year}/${slug}.png` },
    twitter: { images: `/api/og/${year}/${slug}.png` },
  };
}

export async function generateStaticParams(): Promise<
  { slug: string; year: string }[]
> {
  const allPosts = await getAllPosts();

  return allPosts.map(({ slug, year }) => ({ slug, year }));
}

async function getPost(params: PageProps["params"]) {
  const allPosts = await getAllPosts();
  const { slug, year } = await params;

  return allPosts.find((post) => post.year === year && post.slug === slug);
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
      <Mdx code={post.content} />
      <Profile className="pt-10" />
    </>
  );
}
