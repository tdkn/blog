import { differenceInMilliseconds, parseISO } from "date-fns";
import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import type { Post } from "~/types/post";

export interface Props {
  posts: Post[];
}

interface PostFile {
  absolutePath: string;
  relativePath: string;
  year: string;
  slug: string;
}

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH: string = path.join(process.cwd(), "posts");

export const postFiles: PostFile[] = glob
  .sync("**/*.mdx", { cwd: POSTS_PATH })
  .map((relativePath: string): PostFile => {
    const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");

    return {
      absolutePath: path.join(POSTS_PATH, relativePath),
      relativePath,
      year,
      slug,
    };
  });

export const posts: Post[] = postFiles
  .map(({ absolutePath, year, slug }) => {
    const source = fs.readFileSync(absolutePath);
    const { data: frontMatter } = matter(source);

    return {
      url: `/${year}/${slug}`,
      title: frontMatter.title,
      date: frontMatter.date,
    };
  })
  .sort((a, b) => differenceInMilliseconds(parseISO(b.date), parseISO(a.date)));
