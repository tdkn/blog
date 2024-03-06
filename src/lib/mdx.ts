import { parseISO } from "date-fns";
import fs from "fs";
import { glob } from "glob";
import matter from "gray-matter";
import path from "path";

import type { Post } from "~/types/post";

export async function getAllPosts(): Promise<Post[]> {
  const POSTS_PATH: string = path.join(process.cwd(), "posts");
  const postFiles = await glob("**/*.mdx", { cwd: POSTS_PATH });

  return postFiles.map((relativePath: string) => {
    const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");
    const absolutePath = path.join(POSTS_PATH, relativePath);
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
  });
}
