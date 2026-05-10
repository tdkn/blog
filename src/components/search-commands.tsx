"use client";

import { FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { CommandGroup, CommandItem } from "~/components/ui/command";
import { usePostsContext } from "~/contexts/posts-context";
import { formatDate } from "~/lib/format-date";

interface SearchCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export const SearchCommands = ({ setIsOpen }: SearchCommandsProps) => {
  const router = useRouter();
  const { error, loading, posts } = usePostsContext();

  const handleSelectPost = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  if (loading) {
    return (
      <CommandGroup heading="Posts">
        <div className="px-2 py-4 text-sm text-muted-foreground">Loading posts...</div>
      </CommandGroup>
    );
  }

  if (error) {
    return (
      <CommandGroup heading="Posts">
        <div className="px-2 py-4 text-sm text-muted-foreground">
          Failed to load posts. Please try again later.
        </div>
      </CommandGroup>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <CommandGroup heading="Posts">
      {posts.map((post) => (
        <CommandItem
          className="items-start py-2"
          key={post.url}
          keywords={[post.title, post.summary, post.year, post.slug]}
          onSelect={() => {
            handleSelectPost(post.url);
          }}
          value={`${post.title} ${post.summary}`}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileTextIcon />
          </div>
          <div className="flex-1">
            <div className="font-medium">{post.title}</div>
            <div className="text-xs text-muted-foreground">{formatDate(post.date)}</div>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
