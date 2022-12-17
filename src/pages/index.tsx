import { VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React from "react";
import { PostCard } from "~/components/common";
import { MainLayout } from "~/components/layouts";
import { posts } from "~/lib/mdx";
import type { Post } from "~/types/post";

export interface Props {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
