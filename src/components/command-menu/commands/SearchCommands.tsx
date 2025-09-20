"use client";

import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

import { usePostsContext } from "~/contexts/PostsContext";
import { formatDate } from "~/lib/format-date";

interface SearchCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export function SearchCommands({ setIsOpen }: SearchCommandsProps) {
  const router = useRouter();
  const { error, loading, posts } = usePostsContext();

  const handleSelectPost = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  if (loading) {
    return (
      <Command.Group
        className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
        heading="Posts"
      >
        <div className="px-2 py-4 text-sm text-slate-500 dark:text-slate-400">
          Loading posts...
        </div>
      </Command.Group>
    );
  }

  if (error) {
    return (
      <Command.Group
        className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
        heading="Posts"
      >
        <div className="px-2 py-4 text-sm text-slate-500 dark:text-slate-400">
          Failed to load posts. Please try again later.
        </div>
      </Command.Group>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <Command.Group
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
      heading="Posts"
    >
      {posts.map((post) => (
        <Command.Item
          className="relative flex cursor-pointer items-start gap-2 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-slate-100 data-[selected=true]:bg-slate-200 dark:hover:bg-slate-800 dark:data-[selected=true]:bg-slate-700"
          key={post.url}
          keywords={[post.title, post.summary, post.year, post.slug]}
          onSelect={() => handleSelectPost(post.url)}
          value={`${post.title} ${post.summary}`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            <FontAwesomeIcon className="h-3 w-3" icon={faFile} />
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {post.title}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {formatDate(post.date)} • {post.summary}
            </div>
          </div>
        </Command.Item>
      ))}
    </Command.Group>
  );
}
