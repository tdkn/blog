import fs from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import remarkEmoji from "remark-emoji";
import remarkImages from "remark-images";
import { remarkMdxCodeMeta } from "remark-mdx-code-meta";
import { ArticleLayout } from "~/components/layouts";
import { MDXComponents } from "~/components/mdx-components";
import { postFiles, POSTS_PATH } from "~/lib/mdx";

interface PageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

interface PageParams extends ParsedUrlQuery {
  year: string;
  slug: string;
}

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ({
  params,
}) => {
  const { year, slug } = params as PageParams;
  const postFilePath = path.join(POSTS_PATH, year, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data: frontMatter } = matter(source);
  const mdxSource = await serialize(content, {
    scope: frontMatter,
    mdxOptions: {
      remarkPlugins: [remarkImages, remarkEmoji, remarkMdxCodeMeta],
      rehypePlugins: [],
    },
  });

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: postFiles.map(({ year, slug }) => ({ params: { year, slug } })),
  fallback: false,
});

const Post = ({ mdxSource, frontMatter }: PageProps) => (
  <ArticleLayout frontMatter={frontMatter}>
    <MDXRemote {...mdxSource} components={{ ...MDXComponents }} />
  </ArticleLayout>
);

export default Post;
