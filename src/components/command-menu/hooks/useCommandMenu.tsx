"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface CommandMenuContextType {
  isOpen: boolean;
  search: string;
  setIsOpen: (open: ((open: boolean) => boolean) | boolean) => void;
  setSearch: (search: string) => void;
}

const CommandMenuContext = createContext<CommandMenuContextType | undefined>(
  undefined,
);

export function CommandMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <CommandMenuContext.Provider
      value={{
        isOpen,
        search,
        setIsOpen,
        setSearch,
      }}
    >
      {children}
    </CommandMenuContext.Provider>
  );
}

export function useCommandMenu() {
  const context = useContext(CommandMenuContext);
  if (context === undefined) {
    throw new Error("useCommandMenu must be used within a CommandMenuProvider");
  }
  return context;
}
