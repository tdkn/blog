import Link from "next/link";
import Logo from "~/components/Logo";
import DarkModeToggle from "~/components/DarkModeToggle";

const BaseHeader = () => {
  return (
    <header className="blog-header">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <DarkModeToggle />
    </header>
  );
};

export default BaseHeader;
