import { parseISO } from "date-fns";
import { glob } from "glob";
import path from "path";
import { cache, type ComponentType } from "react";

import type { Post } from "~/types/post";

const POSTS_PATH = path.join(process.cwd(), "posts");
const POSTS_PATTERN = "**/*.mdx";

export type PostEntry = {
  component: ComponentType;
  post: Post;
};

type PostFrontmatter = {
  date?: string;
  deprecated?: boolean;
  published?: boolean;
  summary?: string;
  title?: string;
};

type PostModule = {
  default: ComponentType;
  frontmatter?: PostFrontmatter;
};

type PostPathParams = {
  slug: string;
  year: string;
};

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
    deprecated = frontmatter.deprecated;
  }

  if (typeof frontmatter?.published === "boolean") {
    published = frontmatter.published;
  }

  if (typeof frontmatter?.summary === "string") {
    summary = frontmatter.summary;
  }

  if (typeof frontmatter?.title === "string") {
    title = frontmatter.title;
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

const getPostPaths = cache(
  async (): Promise<string[]> => glob(POSTS_PATTERN, { cwd: POSTS_PATH }),
);

const importPostModule = cache(
  async (year: string, slug: string): Promise<PostModule> =>
    import(`../../posts/${year}/${slug}.mdx`),
);

function getPostPathParams(relativePath: string): PostPathParams {
  const [year, slug] = relativePath.replace(/\.mdx$/, "").split("/");

  if (!year || !slug) {
    throw new Error(`Invalid post path: ${relativePath}`);
  }

  return { slug, year };
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const postPaths = (await getPostPaths()).sort();
  const posts = await Promise.all(
    postPaths.map(async (relativePath) => {
      const params = getPostPathParams(relativePath);
      const { frontmatter } = await importPostModule(params.year, params.slug);

      return normalizePostFrontmatter(frontmatter, params);
    }),
  );

  return posts.filter((post) => post.published);
});

export const getPost = cache(
  async (year: string, slug: string): Promise<null | PostEntry> => {
    const posts = await getAllPosts();
    const post = posts.find(
      (entry) => entry.year === year && entry.slug === slug,
    );

    if (!post) {
      return null;
    }

    const { default: component } = await importPostModule(year, slug);

    return { component, post };
  },
);
