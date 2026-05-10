"use client";

import Link from "next/link";
import { SearchIcon } from "lucide-react";

import { Logo } from "~/components/logo";
import { Button } from "~/components/ui/button";

const handleSearchClick = () => {
  const event = new KeyboardEvent("keydown", {
    bubbles: true,
    key: "k",
    metaKey: true,
  });
  document.dispatchEvent(event);
};

const Header = () => (
  <div className="flex items-center justify-between py-10">
    <Link aria-label="Home" href="/">
      <Logo />
    </Link>

    <div className="hidden items-center gap-4 md:flex">
      <Button
        className="h-8 rounded-[10px] px-2.5 pr-[5px]"
        onClick={handleSearchClick}
        size="sm"
        type="button"
        variant="outline"
      >
        <SearchIcon data-icon="inline-start" />
        <span>Search</span>
        <kbd className="rounded-[5px] bg-muted px-1 py-0.5 font-sans text-xs text-muted-foreground">
          ⌘K
        </kbd>
      </Button>
    </div>
  </div>
);

export { Header };
