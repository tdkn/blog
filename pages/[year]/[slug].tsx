import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import React from "react";
import { postFiles, POSTS_PATH } from "~/lib/mdx";
import { InlineCode } from "~/components/common";
import { CodeBlock } from "~/components/common";
import { ArticleLayout } from "~/components/layouts";
import { Link } from "~/components/ui";

interface PageProps {
  mdxSource: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

interface PageParams extends ParsedUrlQuery {
  year: string;
  slug: string;
}

const components = {
  pre: CodeBlock,
  inlineCode: InlineCode,
  a: Link,
};

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
      remarkPlugins: [require("remark-images"), [require("remark-emoji")]],
      rehypePlugins: [
        [require("@mapbox/rehype-prism"), { ignoreMissing: true }],
      ],
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
    <MDXRemote {...mdxSource} components={components} />
  </ArticleLayout>
);

export default Post;
