import { parseISO } from "date-fns";
import fs from "fs";
import { sync } from "glob";
import matter from "gray-matter";
import path from "path";

export type Post = {
  content: string;
  date: Date;
  deprecated: boolean;
  slug: string;
  summary: string;
  title: string;
  url: string;
  year: string;
};

interface PostFile {
  absolutePath: string;
  relativePath: string;
  slug: string;
  year: string;
}

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH: string = path.join(process.cwd(), "posts");

export const postFiles: PostFile[] = sync("**/*.mdx", { cwd: POSTS_PATH }).map(
  (relativePath: string): PostFile => {
    const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");

    return {
      absolutePath: path.join(POSTS_PATH, relativePath),
      relativePath,
      slug,
      year,
    };
  },
);

export const allPosts: Post[] = postFiles.map(
  ({ absolutePath, slug, year }) => {
    const source = fs.readFileSync(absolutePath);
    const { content, data: frontMatter } = matter(source);

    let date: Date = new Date();
    let deprecated: boolean = false;
    let summary: string = "";
    let title: string = "";

    if (typeof frontMatter.date === "string") {
      date = parseISO(frontMatter.date);
    }

    if (typeof frontMatter.deprecated === "boolean") {
      deprecated = frontMatter.deprecated;
    }

    if (typeof frontMatter.summary === "string") {
      summary = frontMatter.summary;
    }

    if (typeof frontMatter.title === "string") {
      title = frontMatter.title;
    }

    return {
      content,
      date,
      deprecated,
      slug,
      summary,
      title,
      url: `/${year}/${slug}`,
      year,
    };
  },
);
