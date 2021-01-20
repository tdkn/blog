import fs from "fs";
import matter from "gray-matter";
import React from "react";
import { postFiles } from "~/lib/mdx";
import MainLayout from "~/components/layouts/MainLayout";
import PostCard from "~/components/PostCard";

export default function Index({ posts }) {
  return (
    <MainLayout>
      {posts.map((post) => (
        <PostCard post={post} key={post.url} />
      ))}
    </MainLayout>
  );
}

export const getStaticProps = () => {
  const posts = postFiles.map(({ absolutePath, year, slug }) => {
    const source = fs.readFileSync(absolutePath);
    const { data } = matter(source);
    const frontMatter = JSON.parse(JSON.stringify(data));

    return {
      url: `/${year}/${slug}`,
      title: frontMatter.title,
      date: frontMatter.date,
      summary: frontMatter.summary,
    };
  });

  return { props: { posts } };
};
