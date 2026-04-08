"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBug, faLink, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from "cmdk";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

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
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this post: ${typeof document !== "undefined" ? document.title : ""}`)}`
    : null;

  const blueskyShareUrl = isPostPage
    ? `https://bsky.app/intent/compose?text=${encodeURIComponent(`Check out this post: ${typeof document !== "undefined" ? document.title : ""} ${currentUrl}`)}`
    : null;

  const actionItems = useMemo(
    () => [
      {
        action: () => {
          void navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied("url");
            setTimeout(() => setCopied(null), 2000);
          });
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
          window.open(
            "https://github.com/tdkn/blog/issues/new?template=1.bug_report.yml",
            "_blank",
          );
        },
        description: "Open GitHub issues to report a bug",
        icon: <FontAwesomeIcon className="h-4 w-4" icon={faBug} />,
        id: "report-bug",
        label: "Report a Bug",
      },
    ],
    [currentUrl, twitterShareUrl, blueskyShareUrl, githubSourceUrl],
  );

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
          className="relative flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-gray-100 data-[selected=true]:bg-gray-200 dark:hover:bg-gray-800 dark:data-[selected=true]:bg-gray-700"
          key={item.id}
          keywords={[item.label, item.description]}
          onSelect={() => handleSelect(item.action)}
          value={`${item.label} ${item.description}`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#F7C953] to-[#F28E53] text-white">
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
        </Command.Item>
      ))}
    </Command.Group>
  );
}
