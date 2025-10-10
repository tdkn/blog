import type { Post, ZennArticle } from "~/types/post";

export const mockZennArticle: ZennArticle = {
  article_type: "tech",
  body_letters_count: 1234,
  comments_count: 5,
  emoji: "📝",
  id: 123,
  liked_count: 42,
  path: "/dummy/articles/abc123def456",
  post_type: "Article",
  publication: null,
  published_at: "2024-01-15T00:00:00.000Z",
  slug: "abc123def456",
  title: "Sample Article Title for Testing",
  user: {
    avatar_small_url: "https://example.com/dummy-avatar.jpg",
    id: 999,
    name: "Test User",
    username: "testuser",
  },
};

export const mockZennPost: Post = {
  content: "",
  date: new Date("2024-01-15T00:00:00.000Z"),
  deprecated: false,
  emoji: "📝",
  published: true,
  slug: "abc123def456",
  source: "zenn" as const,
  summary: "",
  title: "Sample Article Title for Testing",
  url: "https://zenn.dev/tdkn/articles/abc123def456",
  year: "2024",
};

export const mockZennArticlesResponse = {
  articlesData: [mockZennArticle],
  posts: [mockZennPost],
};
