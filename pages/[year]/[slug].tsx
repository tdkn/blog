import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { MdxRemote } from "next-mdx-remote/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";
import { postFiles, POSTS_PATH } from "~/lib/mdx";
import InlineCode from "~/components/InlineCode";
import CodeBlock from "~/components/CodeBlock";
import ArticleLayout from "~/components/ArticleLayout";
import Link from "~/components/Link";

interface PageProps {
  mdxSource: MdxRemote.Source;
  frontMatter: { [key: string]: any };
}

interface PageParams extends ParsedUrlQuery {
  year: string;
  slug: string;
}

const components: MdxRemote.Components = {
  pre: CodeBlock,
  inlineCode: InlineCode,
  a: Link,
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<PageParams>) => {
  const { year, slug } = params;
  const postFilePath = path.join(POSTS_PATH, year, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data: frontMatter } = matter(source);
  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [require("remark-images"), [require("remark-emoji")]],
      rehypePlugins: [
        [require("@mapbox/rehype-prism"), { ignoreMissing: true }],
      ],
    },
    scope: frontMatter,
  });

  return {
    props: {
      mdxSource,
      frontMatter,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFiles.map(({ year, slug }) => ({ params: { year, slug } }));

  return {
    paths,
    fallback: false,
  };
};

const Post = ({ mdxSource, frontMatter }: PageProps) => {
  const content = hydrate(mdxSource, { components });

  return <ArticleLayout frontMatter={frontMatter}>{content}</ArticleLayout>;
};

export default Post;
