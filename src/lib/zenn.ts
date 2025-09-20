import { parseISO } from "date-fns";

import type { Post, ZennArticle } from "~/types/post";

export async function getZennArticles(): Promise<{
  articlesData: ZennArticle[];
  posts: Post[];
}> {
  try {
    const response = await fetch(
      "https://zenn.dev/api/articles?username=tdkn",
      {
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.error("Failed to fetch Zenn articles:", response.status);
      return { articlesData: [], posts: [] };
    }

    const data = (await response.json()) as { articles: ZennArticle[] };

    const posts = data.articles.map((article) => ({
      content: "",
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
  } catch (error) {
    console.error("Error fetching Zenn articles:", error);
    return { articlesData: [], posts: [] };
  }
}
