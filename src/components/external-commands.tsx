"use client";

import {
  faBluesky,
  faFacebook,
  faGithub,
  faMastodon,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLinkIcon } from "lucide-react";

import { CommandGroup, CommandItem } from "~/components/ui/command";

interface ExternalCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export const ExternalCommands = ({ setIsOpen }: ExternalCommandsProps) => {
  const externalLinks = [
    {
      bgColor: "bg-slate-900 dark:bg-slate-800",
      description: "@tdkn",
      icon: <FontAwesomeIcon icon={faGithub} />,
      id: "github",
      label: "GitHub",
      url: "https://github.com/tdkn",
    },
    {
      bgColor: "bg-black",
      description: "@tdkn_",
      icon: <FontAwesomeIcon icon={faXTwitter} />,
      id: "x",
      label: "X",
      url: "https://twitter.com/tdkn_",
    },
    {
      bgColor: "bg-[#00A8E8]",
      description: "@tdkn.bsky.social",
      icon: <FontAwesomeIcon icon={faBluesky} />,
      id: "bluesky",
      label: "Bluesky",
      url: "https://bsky.app/profile/tdkn.bsky.social",
    },
    {
      bgColor: "bg-[#6364FF]",
      description: "@tdkn@mastodon.social",
      icon: <FontAwesomeIcon icon={faMastodon} />,
      id: "mastodon",
      label: "Mastodon",
      url: "https://mastodon.social/@tdkn",
    },
    {
      bgColor: "bg-[#1877F2]",
      description: "@shun.tedokon",
      icon: <FontAwesomeIcon icon={faFacebook} />,
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
    <CommandGroup heading="External Links">
      {externalLinks.map((link) => (
        <CommandItem
          className="py-2"
          key={link.id}
          keywords={[link.label, link.description]}
          onSelect={() => {
            handleSelect(link.url);
          }}
          value={link.url}
        >
          <div
            className={`flex size-8 items-center justify-center rounded-lg text-white ${link.bgColor}`}
          >
            {link.icon}
          </div>
          <div className="flex flex-1 items-center gap-2">
            <div className="font-medium">{link.label}</div>
            <div className="text-xs text-muted-foreground">{link.description}</div>
          </div>
          <ExternalLinkIcon className="opacity-50" />
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
