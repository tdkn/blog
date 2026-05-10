"use client";

import { ChevronRightIcon, HouseIcon, WrenchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { CommandGroup, CommandItem } from "~/components/ui/command";

interface NavigationCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export const NavigationCommands = ({ setIsOpen }: NavigationCommandsProps) => {
  const router = useRouter();

  const navigationItems = [
    {
      description: "Navigate to the home page",
      icon: <HouseIcon />,
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      description: "Access GitHub slash command tool",
      icon: <WrenchIcon />,
      id: "tools",
      label: "GitHub Slash Command Generator",
      path: "/github-slash-command",
    },
  ];

  const handleSelect = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <CommandGroup heading="Navigation">
      {navigationItems.map((item) => (
        <CommandItem
          className="py-2"
          key={item.id}
          keywords={[item.label, item.description]}
          onSelect={() => {
            handleSelect(item.path);
          }}
          value={`${item.label} ${item.description}`}
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="font-medium">{item.label}</div>
          </div>
          <ChevronRightIcon className="opacity-50" />
        </CommandItem>
      ))}
    </CommandGroup>
  );
};
