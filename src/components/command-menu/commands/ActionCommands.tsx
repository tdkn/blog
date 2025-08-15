"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBug, faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from "cmdk";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ActionCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export function ActionCommands({ setIsOpen }: ActionCommandsProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState<null | string>(null);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const isPostPage = pathname.match(/^\/\d{4}\/[^\/]+$/);

  const githubSourceUrl = isPostPage
    ? `https://github.com/tdkn/blog/blob/main/posts${pathname}.mdx`
    : null;

  const twitterShareUrl = isPostPage
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this post: ${document.title}`)}`
    : null;

  const blueskyShareUrl = isPostPage
    ? `https://bsky.app/intent/compose?text=${encodeURIComponent(`Check out this post: ${document.title} ${currentUrl}`)}`
    : null;

  const actionItems = [
    {
      action: async () => {
        await navigator.clipboard.writeText(currentUrl);
        setCopied("url");
        setTimeout(() => setCopied(null), 2000);
      },
      description: "Copy current page URL to clipboard",
      icon: <FontAwesomeIcon className="h-4 w-4" icon={faLink} />,
      id: "copy-url",
      label: "Copy URL",
    },
    ...(twitterShareUrl
      ? [
          {
            action: () => {
              window.open(twitterShareUrl, "_blank");
            },
            description: "Share current post on X/Twitter",
            icon: <FontAwesomeIcon className="h-4 w-4" icon={faShare} />,
            id: "share-twitter",
            label: "Share on X/Twitter",
          },
        ]
      : []),
    ...(blueskyShareUrl
      ? [
          {
            action: () => {
              window.open(blueskyShareUrl, "_blank");
            },
            description: "Share current post on Bluesky",
            icon: <FontAwesomeIcon className="h-4 w-4" icon={faShare} />,
            id: "share-bluesky",
            label: "Share on Bluesky",
          },
        ]
      : []),
    ...(githubSourceUrl
      ? [
          {
            action: () => {
              window.open(githubSourceUrl, "_blank");
            },
            description: "Open post source code on GitHub",
            icon: <FontAwesomeIcon className="h-4 w-4" icon={faGithub} />,
            id: "github-source",
            label: "View Source on GitHub",
          },
        ]
      : []),
    {
      action: () => {
        window.open("https://github.com/tdkn/blog/issues", "_blank");
      },
      description: "Open GitHub issues to report a bug",
      icon: <FontAwesomeIcon className="h-4 w-4" icon={faBug} />,
      id: "report-bug",
      label: "Report a Bug",
    },
  ];

  const handleSelect = (action: () => Promise<void> | void) => {
    setIsOpen(false);
    void action();
  };

  return (
    <Command.Group
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
      heading="Actions"
    >
      {actionItems.map((item) => (
        <Command.Item
          className="relative flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-slate-100 data-[selected=true]:bg-slate-200 dark:hover:bg-slate-800 dark:data-[selected=true]:bg-slate-700"
          key={item.id}
          keywords={[item.label, item.description]}
          onSelect={() => handleSelect(item.action)}
          value={`${item.label} ${item.description}`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {item.label}
              {copied === item.id.split("-")[1] && (
                <span className="ml-1 text-green-600 dark:text-green-400">
                  ✓
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {item.description}
            </div>
          </div>
          <kbd className="ml-auto hidden h-5 items-center gap-1 rounded border border-slate-200 bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 select-none sm:flex dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Command.Item>
      ))}
    </Command.Group>
  );
}
