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
import { ComponentPropsWithoutRef } from "react";

import { Link } from "~/components/ui";
import { classNames } from "~/lib/style";

const Profile = ({
  className,
  ...otherProps
}: ComponentPropsWithoutRef<"aside">) => (
  <aside
    className={classNames("flex flex-row items-center text-sm", className)}
    {...otherProps}
  >
    <Image
      alt="Shun Tedokon"
      className="inline-block h-16 w-16 rounded-full"
      height={64}
      src="/avatar.jpg"
      width={64}
    />
    <div className="ml-4 flex flex-col space-y-1">
      <p className="leading-none text-gray-700 dark:text-gray-300">
        Personal blog by{" "}
        <Link href="https://twitter.com/tdkn_">Shun Tedokon</Link>.
        <br />I write about design, programming, and thinking.
      </p>
      <div className="flex items-center space-x-2">
        <NextLink
          aria-label="GitHub"
          href="https://github.com/tdkn"
          target="_blank"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faGithub} />
        </NextLink>
        <NextLink aria-label="X" href="https://x.com/tdkn_" target="_blank">
          <FontAwesomeIcon className="h-5 w-5" icon={faXTwitter} />
        </NextLink>
        <NextLink
          aria-label="Bluesky"
          href="https://bsky.app/profile/tdkn.bsky.social"
          target="_blank"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faBluesky} />
        </NextLink>
        <NextLink
          aria-label="Mastodon"
          href="https://mastodon.social/@tdkn"
          rel="me"
          target="_blank"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faMastodon} />
        </NextLink>
        <NextLink
          aria-label="Facebook"
          href="https://facebook.com/shun.tedokon"
          target="_blank"
        >
          <FontAwesomeIcon className="h-5 w-5" icon={faFacebook} />
        </NextLink>
      </div>
    </div>
  </aside>
);

export default Profile;
