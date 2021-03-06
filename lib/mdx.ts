import path from "path";
import glob from "glob";

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
