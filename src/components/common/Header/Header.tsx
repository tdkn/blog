"use client";

import Link from "next/link";

import { Logo } from "~/components/ui";

const Header = () => {
  const handleSearchClick = () => {
    const event = new KeyboardEvent("keydown", {
      bubbles: true,
      key: "k",
      metaKey: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <div className="flex items-center justify-between py-10">
      <Link aria-label="Home" href="/">
        <Logo />
      </Link>

      <div className="hidden items-center space-x-4 md:flex">
        <button
          className="flex cursor-pointer items-center gap-1 rounded border border-gray-300 py-1 pr-1 pl-2 text-xs text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
          onClick={handleSearchClick}
          type="button"
        >
          <span>Search</span>
          <kbd className="rounded border border-gray-300 bg-gray-100 px-1 py-0.5 text-xs dark:border-gray-700 dark:bg-gray-700">
            ⌘K
          </kbd>
        </button>
      </div>
    </div>
  );
};

export default Header;
