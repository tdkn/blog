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

const isPostArray = (value: unknown): value is Post[] => Array.isArray(value);

interface PostsProviderProps {
  children: React.ReactNode;
}

export const PostsProvider = ({ children }: PostsProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data: unknown = await response.json();

        if (!isPostArray(data)) {
          throw new TypeError("Invalid posts response");
        }

        setPosts(data);
      } catch (fetchError: unknown) {
        console.error("Failed to fetch posts:", fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  return <PostsContext value={{ error, loading, posts }}>{children}</PostsContext>;
};

export const usePostsContext = (): PostsContextType => use(PostsContext);
