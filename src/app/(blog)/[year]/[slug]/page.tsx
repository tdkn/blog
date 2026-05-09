import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Deprecated } from "~/components/deprecated";
import { Profile } from "~/components/profile";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import { getAllPosts, getPost } from "~/lib/mdx";

import "~/styles/mdx.css";

interface PageProps {
  params: Promise<{
    slug: string;
    year: string;
  }>;
}

const BlogPostPage = async ({ params }: PageProps) => {
  const routeParams = await params;
  const entry = await getPost(routeParams.year, routeParams.slug);

  if (entry === null) {
    notFound();
  }

  const { component: Content, post } = entry;

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
      <Content />
      <Profile className="pt-10" />
    </>
  );
};

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
  const params = await props.params;
  const { slug, year } = params;
  const entry = await getPost(year, slug);

  if (entry === null) {
    return {};
  }

  const { post } = entry;

  return {
    description: post.summary,
    openGraph: {
      description: post.summary,
      images: `/api/og/${year}/${slug}.png`,
      title: post.title,
    },
    title: post.title,
    twitter: {
      description: post.summary,
      images: `/api/og/${year}/${slug}.png`,
      title: post.title,
    },
  };
};

export const generateStaticParams = async (): Promise<{ slug: string; year: string }[]> => {
  const allPosts = await getAllPosts();

  return allPosts.map(({ slug, year }) => ({ slug, year }));
};

export default BlogPostPage;
