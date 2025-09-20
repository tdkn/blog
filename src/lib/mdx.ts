import { parseISO } from "date-fns";
import fs from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

import type { Post } from "~/types/post";

export async function getAllPosts(): Promise<Post[]> {
  const POSTS_PATH: string = path.join(process.cwd(), "posts");
  const postFiles = await glob("**/*.mdx", { cwd: POSTS_PATH });

  const posts = postFiles.map((relativePath: string) => {
    const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");
    const absolutePath = path.join(POSTS_PATH, relativePath);
    const source = fs.readFileSync(absolutePath);
    const { content, data: frontMatter } = matter(source);

    let date: Date = new Date();
    let deprecated: boolean = false;
    let published: boolean = true;
    let summary: string = "";
    let title: string = "";

    if (typeof frontMatter.date === "string") {
      date = parseISO(frontMatter.date);
    }

    if (typeof frontMatter.deprecated === "boolean") {
      deprecated = frontMatter.deprecated;
    }

    if (typeof frontMatter.published === "boolean") {
      published = frontMatter.published;
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
      published,
      slug,
      source: "local" as const,
      summary,
      title,
      url: `/${year}/${slug}`,
      year,
    };
  });

  return posts.filter((post) => post.published);
}
