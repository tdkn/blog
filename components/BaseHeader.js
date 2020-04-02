import React from "react";
import Link from "next/link";
import Logo from "~/components/Logo";

const BaseHeader = () => {
  return (
    <header className="blog-header">
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
    </header>
  );
};

export default BaseHeader;
