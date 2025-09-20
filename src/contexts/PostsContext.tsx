"use client";

import { createContext, use, useEffect, useState } from "react";

import type { Post } from "~/types/post";

interface PostsContextType {
  error: boolean;
  loading: boolean;
  posts: Post[];
}

const PostsContext = createContext<PostsContextType>({
  error: false,
  loading: true,
  posts: [],
});

interface PostsProviderProps {
  children: React.ReactNode;
}

export function PostsProvider({ children }: PostsProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data: Post[]) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <PostsContext value={{ error, loading, posts }}>{children}</PostsContext>
  );
}

export function usePostsContext(): PostsContextType {
  return use(PostsContext);
}
