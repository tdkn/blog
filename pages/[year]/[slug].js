import fs from "fs";
import path from "path";
import matter from "gray-matter";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import React from "react";
import { DateTime } from "luxon";
import { POSTS_PATH, postFiles } from "~/lib/mdx";
import BaseHeader from "~/components/BaseHeader";
import BaseFooter from "~/components/BaseFooter";
import CustomHead from "~/components/CustomHead";
import InlineCode from "~/components/InlineCode";
import CodeBlock from "~/components/CodeBlock";
import generateOgImage from "~/scripts/og-image";

export const components = {
  pre: CodeBlock,
  inlineCode: InlineCode,
};

export default function ArticleLayout({ source, frontMatter }) {
  const content = hydrate(source, { components });

  return (
    <div className="blog-layout-article">
      <CustomHead
        title={frontMatter.title}
        description={frontMatter.summary}
        ogImage={frontMatter.ogImage}
      />

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
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, params.year, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const ogImagePath = postFilePath
    .split("/")
    .pop()
    .replace(/\.mdx$/, ".png");
  const frontMatter = {
    ...data,
    ogImage: `/og/${ogImagePath}`,
  };
  const mdxSource = await renderToString(content, {
    components,
    mdxOptions: {
      remarkPlugins: [require("remark-images"), require("remark-emoji")],
      rehypePlugins: [require("@mapbox/rehype-prism")],
    },
    scope: frontMatter,
  });

  // Generate Open Graph image
  if (process.env.NODE_ENV === "production") {
    await generateOgImage({
      title: frontMatter.title,
      filePath: postFilePath,
    });

    console.log("🌈 og:image created");
  }

  return {
    props: {
      source: mdxSource,
      frontMatter,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = postFiles.map(({ year, slug }) => {
    return { params: { year, slug } };
  });

  return {
    paths,
    fallback: false,
  };
};
