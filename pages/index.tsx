import { GetStaticProps } from "next";
import fs from "fs";
import matter from "gray-matter";
import React from "react";
import { DateTime } from "luxon";
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

export const getStaticProps: GetStaticProps = async () => {
  const posts = postFiles
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
    .sort((a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date));

  return { props: { posts } };
};
