"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";

import { ActionCommands } from "./commands/ActionCommands";
import { ExternalCommands } from "./commands/ExternalCommands";
import { NavigationCommands } from "./commands/NavigationCommands";
import { SearchCommands } from "./commands/SearchCommands";

export function CommandMenu() {
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
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="animate-in fade-in-0 fixed inset-0 z-50 bg-black/50 duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="animate-in slide-in-from-bottom-10 fixed top-[20%] left-[50%] max-h-[500px] w-full max-w-[640px] translate-x-[-50%] transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          className="overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-slate-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.04)]"
          shouldFilter={true}
          vimBindings={true}
        >
          <Command.Input
            autoFocus={true}
            className="flex h-12 w-full border-b border-slate-200/50 bg-transparent px-4 text-[15px] outline-none placeholder:text-slate-500 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700/50 dark:placeholder:text-slate-400"
            placeholder="Type a command or search..."
          />
          <Command.List className="max-h-[400px] overflow-x-hidden overflow-y-auto overscroll-contain p-2">
            <Command.Empty className="py-14 text-center text-sm text-slate-500 dark:text-slate-400">
              No results found.
            </Command.Empty>

            <SearchCommands setIsOpen={setIsOpen} />
            <NavigationCommands setIsOpen={setIsOpen} />
            <ActionCommands setIsOpen={setIsOpen} />
            <ExternalCommands setIsOpen={setIsOpen} />
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
