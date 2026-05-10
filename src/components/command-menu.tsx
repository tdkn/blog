"use client";

import { useEffect, useState } from "react";

import { ActionCommands } from "~/components/action-commands";
import { ExternalCommands } from "~/components/external-commands";
import { NavigationCommands } from "~/components/navigation-commands";
import { SearchCommands } from "~/components/search-commands";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "~/components/ui/command";

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
      if (e.key === "/" && isOpen) {
        e.preventDefault();
        // Focus is automatically handled by the Command component
      }
    };

    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, [isOpen]);

  return (
    <CommandDialog
      className="sm:max-w-2xl"
      description="Search posts, navigate pages, and run actions."
      onOpenChange={setIsOpen}
      open={isOpen}
      title="Command Menu"
    >
      <Command shouldFilter={true} vimBindings={true}>
        <CommandInput autoFocus={true} placeholder="Type a command or search..." />
        <CommandList className="max-h-[420px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <SearchCommands setIsOpen={setIsOpen} />
          <NavigationCommands setIsOpen={setIsOpen} />
          <ActionCommands setIsOpen={setIsOpen} />
          <ExternalCommands setIsOpen={setIsOpen} />
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
