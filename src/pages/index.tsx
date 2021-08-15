import { VStack } from "@chakra-ui/react";
import { differenceInMilliseconds, parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import React from "react";
import { PostCard } from "~/components/common";
import { MainLayout } from "~/components/layouts";
import { postFiles } from "~/lib/mdx";
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
    <VStack align="stretch" pt="8">
      {posts.map((post, key) => (
        <PostCard post={post} key={key} />
      ))}
    </VStack>
  </MainLayout>
);

export default Index;
