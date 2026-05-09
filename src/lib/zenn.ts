import { parseISO } from "date-fns";

import type { Post, ZennArticle } from "~/types/post";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isZennArticle = (value: unknown): value is ZennArticle => {
  if (isRecord(value)) {
    return (
      typeof value.emoji === "string" &&
      typeof value.path === "string" &&
      typeof value.published_at === "string" &&
      typeof value.slug === "string" &&
      typeof value.title === "string"
    );
  }

  return false;
};

const isZennArticlesResponse = (value: unknown): value is { articles: ZennArticle[] } =>
  isRecord(value) && Array.isArray(value.articles) && value.articles.every(isZennArticle);

export const getZennArticles = async (): Promise<{
  articlesData: ZennArticle[];
  posts: Post[];
}> => {
  try {
    const response = await fetch("https://zenn.dev/api/articles?username=tdkn", {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data: unknown = await response.json();

      if (isZennArticlesResponse(data)) {
        const posts = data.articles.map((article) => ({
          date: parseISO(article.published_at),
          deprecated: false,
          emoji: article.emoji,
          published: true,
          slug: article.slug,
          source: "zenn" as const,
          summary: "",
          title: article.title,
          url: `https://zenn.dev${article.path}`,
          year: parseISO(article.published_at).getFullYear().toString(),
        }));

        return { articlesData: data.articles, posts };
      }

      console.error("Invalid Zenn articles response");
      return { articlesData: [], posts: [] };
    }

    console.error("Failed to fetch Zenn articles:", response.status);
    return { articlesData: [], posts: [] };
  } catch (error) {
    console.error("Error fetching Zenn articles:", error);
    return { articlesData: [], posts: [] };
  }
};
