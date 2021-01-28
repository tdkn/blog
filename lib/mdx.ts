import path from "path";
import glob from "glob";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "posts");

export const postFiles = glob
  .sync("**/*.mdx", { cwd: POSTS_PATH })
  .map((relativePath: string) => {
    const [year, slug] = relativePath.replace(/\.mdx?$/, "").split("/");

    return {
      absolutePath: path.join(POSTS_PATH, relativePath),
      relativePath,
      year,
      slug,
    };
  });
