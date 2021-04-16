import { GetStaticProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import React from "react";
import { parseISO, differenceInMilliseconds } from "date-fns";
import { postFiles } from "~/lib/mdx";
import { MainLayout } from "~/components/layouts";
import { PostCard } from "~/components/common";
import type { Post } from "~/types";

export interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts: Post[] = postFiles
    .map(({ absolutePath, year, slug }) => {
      const source = fs.readFileSync(absolutePath);
      const { data: frontMatter } = matter(source);

      return {
        url: `/${year}/${slug}`,
        title: frontMatter.title,
        date: frontMatter.date,
        summary: frontMatter.summary,
      };
    })
    .sort((a, b) =>
      differenceInMilliseconds(parseISO(b.date), parseISO(a.date))
    );

  return { props: { posts } };
};

const Index: React.VFC<Props> = ({ posts }) => (
  <MainLayout>
    {posts.map((post) => (
      <PostCard post={post} key={post.url} />
    ))}
  </MainLayout>
);

export default Index;
