"use client";

import {
  faChevronRight,
  faHouse,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";

interface NavigationCommandsProps {
  setIsOpen: (open: boolean) => void;
}

export function NavigationCommands({ setIsOpen }: NavigationCommandsProps) {
  const router = useRouter();

  const navigationItems = [
    {
      description: "Navigate to the home page",
      icon: <FontAwesomeIcon className="h-4 w-4" icon={faHouse} />,
      id: "home",
      label: "Home",
      path: "/",
    },
    {
      description: "Access GitHub slash command tool",
      icon: <FontAwesomeIcon className="h-4 w-4" icon={faWrench} />,
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
    <Command.Group
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400"
      heading="Navigation"
    >
      {navigationItems.map((item) => (
        <Command.Item
          className="relative flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm transition-colors outline-none hover:bg-gray-100 data-[selected=true]:bg-gray-200 dark:hover:bg-gray-800 dark:data-[selected=true]:bg-gray-700"
          key={item.id}
          keywords={[item.label, item.description]}
          onSelect={() => handleSelect(item.path)}
          value={`${item.label} ${item.description}`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#F7C953] to-[#F28E53] text-white">
            {item.icon}
          </div>
          <div className="flex-1">
            <div className="font-medium text-slate-900 dark:text-slate-100">
              {item.label}
            </div>
          </div>
          <FontAwesomeIcon
            className="h-4 w-4 opacity-50"
            icon={faChevronRight}
          />
        </Command.Item>
      ))}
    </Command.Group>
  );
}
