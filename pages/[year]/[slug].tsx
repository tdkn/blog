import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { MdxRemote } from "next-mdx-remote/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";
import { DateTime } from "luxon";
import { postFiles, POSTS_PATH } from "~/lib/mdx";
import BaseHeader from "~/components/BaseHeader";
import BaseFooter from "~/components/BaseFooter";
import CustomHead from "~/components/CustomHead";
import InlineCode from "~/components/InlineCode";
import CodeBlock from "~/components/CodeBlock";

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
      remarkPlugins: [require("remark-images"), require("remark-emoji")],
      rehypePlugins: [require("@mapbox/rehype-prism")],
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

  return (
    <div className="blog-layout-article">
      <CustomHead title={frontMatter.title} description={frontMatter.summary} />

      <BaseHeader />

      <div className="pb-8">
        <h1>{frontMatter.title}</h1>
        <p className="text-sm text-gray-600">
          {DateTime.fromISO(frontMatter.date).toRelative()}
        </p>
      </div>

      <main className="pb-10">{content}</main>

      <aside className="flex items-center py-5">
        <img
          src="/avatar.jpg"
          alt="Avatar"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="text-sm">
          <p>
            Personal blog by{" "}
            <a
              className="font-bold leading-none"
              href="https://twitter.com/tdkn_"
            >
              Shun Tedokon
            </a>
            .
          </p>
          <p>I write about design, programming, and thinking.</p>
        </div>
      </aside>

      <BaseFooter />
    </div>
  );
};

export default Post;
