export type Post = {
  content: string;
  date: Date;
  deprecated: boolean;
  emoji?: string;
  published: boolean;
  slug: string;
  source?: "local" | "zenn";
  summary: string;
  title: string;
  url: string;
  year: string;
};

export type ZennArticle = {
  article_type: string;
  body_letters_count: number;
  comments_count: number;
  emoji: string;
  id: number;
  liked_count: number;
  path: string;
  post_type: string;
  publication: null;
  published_at: string;
  slug: string;
  title: string;
  user: {
    avatar_small_url: string;
    id: number;
    name: string;
    username: string;
  };
};
