"use client";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BugIcon, CheckIcon, LinkIcon, Share2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { CommandGroup, CommandItem } from "~/components/ui/command";

interface ActionCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export const ActionCommands = ({ setIsOpen }: ActionCommandsProps) => {
  const pathname = usePathname();
  const [copied, setCopied] = useState<null | string>(null);

  const currentUrl = typeof window === "undefined" ? "" : window.location.href;
  const documentTitle = typeof document === "undefined" ? "" : document.title;
  const isPostPage = /^\/\d{4}\/[^/]+$/u.exec(pathname) !== null;

  const githubSourceUrl = isPostPage
    ? `https://github.com/tdkn/blog/blob/main/posts${pathname}.mdx`
    : null;

  const twitterShareUrl = isPostPage
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`Check out this post: ${documentTitle}`)}`
    : null;

  const blueskyShareUrl = isPostPage
    ? `https://bsky.app/intent/compose?text=${encodeURIComponent(`Check out this post: ${documentTitle} ${currentUrl}`)}`
    : null;

  const copyCurrentUrl = useCallback(async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied("url");
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  }, [currentUrl]);

  const actionItems = useMemo(
    () => [
      {
        action: () => {
          void copyCurrentUrl();
        },
        description: "Copy current page URL to clipboard",
        icon: <LinkIcon />,
        id: "copy-url",
        label: "Copy URL",
      },
      ...(twitterShareUrl === null
        ? []
        : [
            {
              action: () => {
                window.open(twitterShareUrl, "_blank");
              },
              description: "Share current post on X/Twitter",
              icon: <Share2Icon />,
              id: "share-twitter",
              label: "Share on X/Twitter",
            },
          ]),
      ...(blueskyShareUrl === null
        ? []
        : [
            {
              action: () => {
                window.open(blueskyShareUrl, "_blank");
              },
              description: "Share current post on Bluesky",
              icon: <Share2Icon />,
              id: "share-bluesky",
              label: "Share on Bluesky",
            },
          ]),
      ...(githubSourceUrl === null
        ? []
        : [
            {
              action: () => {
                window.open(githubSourceUrl, "_blank");
              },
              description: "Open post source code on GitHub",
              icon: <FontAwesomeIcon icon={faGithub} />,
              id: "github-source",
              label: "View Source on GitHub",
            },
          ]),
      {
        action: () => {
          window.open(
            "https://github.com/tdkn/blog/issues/new?template=1.bug_report.yml",
            "_blank",
          );
        },
        description: "Open GitHub issues to report a bug",
        icon: <BugIcon />,
        id: "report-bug",
        label: "Report a Bug",
      },
    ],
    [copyCurrentUrl, twitterShareUrl, blueskyShareUrl, githubSourceUrl],
  );

  const handleSelect = (action: () => Promise<void> | void) => {
    setIsOpen(false);
    void action();
  };

  return (
    <CommandGroup heading="Actions">
      {actionItems.map((item) => (
        <CommandItem
          className="py-2"
          key={item.id}
          keywords={[item.label, item.description]}
          onSelect={() => {
            handleSelect(item.action);
          }}
          value={`${item.label} ${item.description}`}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1 font-medium">
              {item.label}
              {copied === item.id.split("-")[1] && <CheckIcon className="text-primary" />}
            </div>
            <div className="text-xs text-muted-foreground">{item.description}</div>
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
