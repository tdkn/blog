"use client";

import {
  faBluesky,
  faFacebook,
  faGithub,
  faMastodon,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from "cmdk";

interface ExternalCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export function ExternalCommands({ setIsOpen }: ExternalCommandsProps) {
  const externalLinks = [
    {
      bgColor: "bg-slate-900 dark:bg-slate-800",
      description: "@tdkn",
      icon: <FontAwesomeIcon className="h-4 w-4 text-white" icon={faGithub} />,
      id: "github",
      label: "GitHub",
      url: "https://github.com/tdkn",
    },
    {
      bgColor: "bg-black",
      description: "@tdkn_",
      icon: (
        <FontAwesomeIcon className="h-4 w-4 text-white" icon={faXTwitter} />
      ),
      id: "x",
      label: "X",
      url: "https://twitter.com/tdkn_",
    },
    {
      bgColor: "bg-[#00A8E8]",
      description: "@tdkn.bsky.social",
      icon: <FontAwesomeIcon className="h-4 w-4 text-white" icon={faBluesky} />,
      id: "bluesky",
      label: "Bluesky",
      url: "https://bsky.app/profile/tdkn.bsky.social",
    },
    {
      bgColor: "bg-[#6364FF]",
      description: "@tdkn@mastodon.social",
      icon: (
        <FontAwesomeIcon className="h-4 w-4 text-white" icon={faMastodon} />
      ),
      id: "mastodon",
      label: "Mastodon",
      url: "https://mastodon.social/@tdkn",
    },
    {
      bgColor: "bg-[#1877F2]",
      description: "@shun.tedokon",
      icon: (
        <FontAwesomeIcon className="h-4 w-4 text-white" icon={faFacebook} />
      ),
      id: "facebook",
      label: "Facebook",
      url: "https://facebook.com/shun.tedokon",
    },
  ];

  const handleSelect = (url: string) => {
    setIsOpen(false);
    window.open(url, "_blank");
  };

  return (
    <Command.Group
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
      heading="External Links"
    >
      {externalLinks.map((link) => (
        <Command.Item
          className="relative flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-slate-100 data-[selected=true]:bg-slate-200 dark:hover:bg-slate-800 dark:data-[selected=true]:bg-slate-700"
          key={link.id}
          keywords={[link.label, link.description]}
          onSelect={() => handleSelect(link.url)}
          value={link.url}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-md ${link.bgColor}`}
          >
            {link.icon}
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {link.label}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {link.description}
            </div>
          </div>
          <FontAwesomeIcon
            className="h-4 w-4 opacity-50"
            icon={faArrowUpRightFromSquare}
          />
        </Command.Item>
      ))}
    </Command.Group>
  );
}
