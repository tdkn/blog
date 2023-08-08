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
    <Link href="/" aria-label="Home">
      <Logo />
    </Link>

    <div className="flex items-center space-x-4">
      <Link href="https://github.com/tdkn" target="_blank" aria-label="GitHub">
        <FontAwesomeIcon icon={faGithub} className="h-5 w-5" />
      </Link>
      <Link href="https://x.com/tdkn_" target="_blank" aria-label="X">
        <FontAwesomeIcon icon={faXTwitter} className="h-5 w-5" />
      </Link>
      <Link
        href="https://mastodon.social/@tdkn"
        rel="me"
        target="_blank"
        aria-label="Mastodon"
      >
        <FontAwesomeIcon icon={faMastodon} className="h-5 w-5" />
      </Link>
      <Link
        href="https://facebook.com/shun.tedokon"
        target="_blank"
        aria-label="Facebook"
      >
        <FontAwesomeIcon icon={faFacebook} className="h-5 w-5" />
      </Link>
    </div>
  </div>
);

export default Header;
