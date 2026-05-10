import {
  faBluesky,
  faFacebook,
  faGithub,
  faMastodon,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Link } from "~/components/link";
import { cn } from "~/lib/utils";

const socialLinks = [
  {
    href: "https://github.com/tdkn",
    icon: faGithub,
    label: "GitHub",
  },
  {
    href: "https://x.com/tdkn_",
    icon: faXTwitter,
    label: "X",
  },
  {
    href: "https://bsky.app/profile/tdkn.bsky.social",
    icon: faBluesky,
    label: "Bluesky",
  },
  {
    href: "https://mastodon.social/@tdkn",
    icon: faMastodon,
    label: "Mastodon",
    rel: "me",
  },
  {
    href: "https://facebook.com/shun.tedokon",
    icon: faFacebook,
    label: "Facebook",
  },
];

const Profile = ({ className, ...otherProps }: ComponentPropsWithoutRef<"aside">) => (
  <aside className={cn("py-5 text-sm", className)} {...otherProps}>
    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
      <Image
        alt="Shun Tedokon"
        className="size-14 rounded-full object-cover ring-1 ring-border/80 md:size-16"
        height={64}
        src="/avatar.jpg"
        width={64}
      />
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="leading-relaxed text-muted-foreground">
            Writing by <Link href="https://twitter.com/tdkn_">Shun Tedokon</Link> on software,
            design,
            <br />
            and the craft of making things.
          </p>
        </div>
        <nav aria-label="Social links" className="flex items-center gap-3 text-muted-foreground">
          {socialLinks.map((socialLink) => (
            <NextLink
              key={socialLink.href}
              aria-label={socialLink.label}
              className="inline-flex size-5 items-center justify-center transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/50"
              href={socialLink.href}
              rel={socialLink.rel}
              target="_blank"
            >
              <FontAwesomeIcon className="size-4" icon={socialLink.icon} />
            </NextLink>
          ))}
        </nav>
      </div>
    </div>
  </aside>
);

export { Profile };
