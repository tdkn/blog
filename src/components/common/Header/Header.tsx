import {
  faFacebook,
  faGithub,
  faMastodon,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { Logo } from "~/components/ui";

const Header = () => (
  <div className="flex items-center justify-between py-10">
    <Link aria-label="Home" href="/">
      <Logo />
    </Link>

    <div className="flex items-center space-x-4">
      <Link aria-label="GitHub" href="https://github.com/tdkn" target="_blank">
        <FontAwesomeIcon className="h-5 w-5" icon={faGithub} />
      </Link>
      <Link aria-label="X" href="https://x.com/tdkn_" target="_blank">
        <FontAwesomeIcon className="h-5 w-5" icon={faXTwitter} />
      </Link>
      <Link
        aria-label="Mastodon"
        href="https://mastodon.social/@tdkn"
        rel="me"
        target="_blank"
      >
        <FontAwesomeIcon className="h-5 w-5" icon={faMastodon} />
      </Link>
      <Link
        aria-label="Facebook"
        href="https://facebook.com/shun.tedokon"
        target="_blank"
      >
        <FontAwesomeIcon className="h-5 w-5" icon={faFacebook} />
      </Link>
    </div>
  </div>
);

export default Header;
