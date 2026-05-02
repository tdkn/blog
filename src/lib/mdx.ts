import path from "node:path";

import { parseISO } from "date-fns";
import { glob } from "glob";
import { cache } from "react";
import type { ComponentType } from "react";

import type { Post } from "~/types/post";

const POSTS_PATH = path.join(process.cwd(), "posts");
const POSTS_PATTERN = "**/*.mdx";

export interface PostEntry {
  component: ComponentType;
  post: Post;
}

interface PostFrontmatter {
  date?: string;
  deprecated?: boolean;
  published?: boolean;
  summary?: string;
  title?: string;
}

interface PostModule {
  default: ComponentType;
  frontmatter?: PostFrontmatter;
}

interface PostPathParams {
  slug: string;
  year: string;
}

export function normalizePostFrontmatter(
  frontmatter: PostFrontmatter | undefined,
  { slug, year }: PostPathParams,
): Post {
  let date = new Date();
  let deprecated = false;
  let published = true;
  let summary = "";
  let title = "";

  if (typeof frontmatter?.date === "string") {
    date = parseISO(frontmatter.date);
  }

  if (typeof frontmatter?.deprecated === "boolean") {
    ({ deprecated } = frontmatter);
  }

  if (typeof frontmatter?.published === "boolean") {
    ({ published } = frontmatter);
  }

  if (typeof frontmatter?.summary === "string") {
    ({ summary } = frontmatter);
  }

  if (typeof frontmatter?.title === "string") {
    ({ title } = frontmatter);
  }

  return {
    date,
    deprecated,
    published,
    slug,
    source: "local",
    summary,
    title,
    url: `/${year}/${slug}`,
    year,
  };
}

const getPostPaths = cache(async (): Promise<string[]> => glob(POSTS_PATTERN, { cwd: POSTS_PATH }));

const importPostModule = cache(
  async (year: string, slug: string): Promise<PostModule> =>
    (await import(`../../posts/${year}/${slug}.mdx`)) as PostModule,
);

function getPostPathParams(relativePath: string): PostPathParams {
  const [year, slug] = relativePath.replace(/\.mdx$/, "").split("/");

  if (!year || !slug) {
    throw new Error(`Invalid post path: ${relativePath}`);
  }

  return { slug, year };
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const postPaths = (await getPostPaths()).toSorted();
  const posts = await Promise.all(
    postPaths.map(async (relativePath) => {
      const params = getPostPathParams(relativePath);
      const { frontmatter } = await importPostModule(params.year, params.slug);

      return normalizePostFrontmatter(frontmatter, params);
    }),
  );

  return posts.filter((post) => post.published);
});

export const getPost = cache(async (year: string, slug: string): Promise<null | PostEntry> => {
  const posts = await getAllPosts();
  const post = posts.find((entry) => entry.year === year && entry.slug === slug);

  if (!post) {
    return null;
  }

  const { default: component } = await importPostModule(year, slug);

  return { component, post };
});
