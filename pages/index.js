import React from "react";
import MainLayout from "~/components/layouts/MainLayout";
import PostCard from "~/components/PostCard";
import { frontMatter as posts } from "./**/*.mdx";

const Home = () => (
  <MainLayout>
    {posts.map(post => (
      <PostCard post={post} key={post.url} />
    ))}
  </MainLayout>
);

export default Home;
