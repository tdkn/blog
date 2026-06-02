"use client";

/* eslint-disable no-use-before-define */

import { useEffect, useMemo, useState } from "react";

import { CheckIcon, CopyIcon, RotateCcwIcon, SearchIcon, SparklesIcon } from "lucide-react";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

import { DEFAULTS_OPTIONS } from "./options";
import type { DefaultsOption, DefaultsValue } from "./options";

const STORAGE_KEY = "macos-defaults-picker:v2";
const ALL_GROUP = "All";
const OPTIONS: readonly DefaultsOption[] = DEFAULTS_OPTIONS;

type CopyStatus = "copied" | "failed" | "idle";
type SelectedState = Record<string, boolean>;
type ValuesState = Record<string, DefaultsValue>;

interface NixNode {
  [key: string]: DefaultsValue | NixNode;
}

interface StoredState {
  selected?: SelectedState;
  values?: ValuesState;
}

const initialSelected = () => Object.fromEntries(OPTIONS.map((option) => [option.id, false]));

const initialValues = () =>
  Object.fromEntries(OPTIONS.map((option) => [option.id, option.defaultValue]));

export const MacOSDefaultsPicker = () => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const [group, setGroup] = useState(ALL_GROUP);
  const [hasRestored, setHasRestored] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SelectedState>(initialSelected);
  const [values, setValues] = useState<ValuesState>(initialValues);

  useEffect(() => {
    try {
      const payload: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");

      if (isStoredState(payload)) {
        setSelected((current) => ({
          ...current,
          ...filterKnownSelected(payload.selected ?? {}),
        }));
        setValues((current) => ({
          ...current,
          ...filterKnownValues(payload.values ?? {}),
        }));
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasRestored(true);
    }
  }, []);

  useEffect(() => {
    if (!hasRestored) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, values }));
  }, [hasRestored, selected, values]);

  const groups = useMemo(() => {
    const items = [ALL_GROUP];

    for (const option of OPTIONS) {
      if (!items.includes(option.group)) {
        items.push(option.group);
      }
    }

    return items;
  }, []);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredOptions = OPTIONS.filter((option) =>
    matchesFilters(option, group, normalizedQuery),
  );
  const groupedOptions = groups
    .filter((item) => item !== ALL_GROUP)
    .map((item) => ({
      group: item,
      options: filteredOptions.filter((option) => option.group === item),
    }))
    .filter((item) => item.options.length > 0);
  const selectedOptions = OPTIONS.filter((option) => selected[option.id]);
  const presetState = getPresetState(selected);
  const nixOutput = toNix(selectedOptions, values);

  const selectPreset = (preset: "recommended") => {
    setSelected(Object.fromEntries(OPTIONS.map((option) => [option.id, option[preset] === true])));
  };

  const clearAll = () => {
    setSelected(Object.fromEntries(OPTIONS.map((option) => [option.id, false])));
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }

    window.setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <section className="flex min-w-0 flex-col gap-5" aria-label="defaults options">
        <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-card p-3 sm:p-4">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
            <label className="relative block" htmlFor="macos-defaults-picker-search">
              <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2.5 size-4 text-muted-foreground" />
              <Input
                className="h-10 bg-background pl-8"
                id="macos-defaults-picker-search"
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                placeholder="検索: Finder, Dock, trackpad, AppleShowAllFiles"
                type="search"
                value={query}
              />
            </label>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <Button
                className="h-10"
                onClick={() => {
                  selectPreset("recommended");
                }}
                type="button"
                variant={presetState === "recommended" ? "default" : "outline"}
              >
                <SparklesIcon data-icon="inline-start" />
                おすすめ
              </Button>
              <Button
                className="h-10"
                onClick={clearAll}
                type="button"
                variant={presetState === "empty" ? "default" : "outline"}
              >
                <RotateCcwIcon data-icon="inline-start" />
                解除
              </Button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="categories">
            {groups.map((item) => (
              <Button
                className="h-8"
                key={item}
                onClick={() => {
                  setGroup(item);
                }}
                type="button"
                variant={group === item ? "default" : "outline"}
              >
                {item} ({countByGroup(item)})
              </Button>
            ))}
          </div>
        </div>

        {groupedOptions.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            一致する設定がありません。
          </div>
        ) : (
          groupedOptions.map((item) => (
            <section className="flex flex-col gap-3" key={item.group}>
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold">{item.group}</h2>
                <span className="text-xs text-muted-foreground">{item.options.length} options</span>
              </div>
              <div className="grid gap-2">
                {item.options.map((option) => (
                  <OptionRow
                    key={option.id}
                    option={option}
                    selected={selected[option.id]}
                    value={values[option.id]}
                    onSelectedChange={(checked) => {
                      setSelected((current) => ({ ...current, [option.id]: checked }));
                    }}
                    onValueChange={(value) => {
                      setValues((current) => ({ ...current, [option.id]: value }));
                    }}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </section>

      <aside className="xl:sticky xl:top-6 xl:self-start" aria-label="selected output">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>選択結果</CardTitle>
              <Badge variant="secondary">{selectedOptions.length} selected</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            <OutputField
              copyStatus={copyStatus}
              label="Nix output"
              onCopy={() => {
                void copyText(nixOutput);
              }}
              value={nixOutput}
            />
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

const OptionRow = ({
  onSelectedChange,
  onValueChange,
  option,
  selected,
  value,
}: {
  onSelectedChange: (selected: boolean) => void;
  onValueChange: (value: DefaultsValue) => void;
  option: DefaultsOption;
  selected: boolean;
  value: DefaultsValue;
}) => (
  <article
    className={cn(
      "grid gap-3 rounded-lg border border-border/70 bg-card p-3 transition-colors sm:grid-cols-[auto_minmax(0,1fr)_minmax(150px,220px)] sm:items-center",
      selected && "border-primary/40 bg-accent/65",
    )}
  >
    <Checkbox
      aria-label={option.title}
      checked={selected}
      onCheckedChange={(checked) => {
        onSelectedChange(checked);
      }}
    />
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-medium leading-6">{option.title}</h3>
        {option.recommended === true ? <Badge variant="secondary">recommended</Badge> : null}
      </div>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{option.desc}</p>
      <code className="mt-2 block truncate rounded-md bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
        {formatManualPath(option.path)}
      </code>
    </div>
    <ValueControl option={option} value={value} onValueChange={onValueChange} />
  </article>
);

const ValueControl = ({
  onValueChange,
  option,
  value,
}: {
  onValueChange: (value: DefaultsValue) => void;
  option: DefaultsOption;
  value: DefaultsValue;
}) => {
  if (option.type === "boolean") {
    return (
      <select
        className={selectClassName}
        onChange={(event) => {
          onValueChange(event.target.value === "true");
        }}
        value={String(value)}
      >
        <option value="true">true</option>
        <option value="false">false</option>
      </select>
    );
  }

  if (option.type === "enum") {
    return (
      <select
        className={selectClassName}
        onChange={(event) => {
          const match = option.values?.find(
            (choice) => String(choice.value) === event.target.value,
          );
          onValueChange(match ? match.value : event.target.value);
        }}
        value={String(value)}
      >
        {option.values?.map((choice) => (
          <option key={`${option.id}-${String(choice.value)}`} value={String(choice.value)}>
            {choice.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <Input
      className="h-10 bg-background"
      onChange={(event) => {
        onValueChange(option.type === "number" ? Number(event.target.value) : event.target.value);
      }}
      step={option.type === "number" ? "any" : undefined}
      type={option.type === "number" ? "number" : "text"}
      value={String(value)}
    />
  );
};

const OutputField = ({
  copyStatus,
  label,
  onCopy,
  value,
}: {
  copyStatus: CopyStatus;
  label: string;
  onCopy: () => void;
  value: string;
}) => {
  const copyButtonText = {
    copied: "Copied",
    failed: "Failed",
    idle: "Copy",
  }[copyStatus];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium">{label}</label>
        <Button className="w-24" onClick={onCopy} type="button" variant="secondary">
          {copyStatus === "copied" ? (
            <CheckIcon data-icon="inline-start" />
          ) : (
            <CopyIcon data-icon="inline-start" />
          )}
          {copyButtonText}
        </Button>
      </div>
      <Textarea
        className="min-h-96 resize-y bg-muted/50 font-mono text-xs leading-5"
        readOnly={true}
        spellCheck={false}
        value={value}
      />
    </div>
  );
};

const selectClassName =
  "h-10 w-full rounded-lg border border-input bg-background px-2.5 py-1 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

const filterKnownSelected = (values: SelectedState): SelectedState =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([id, value]) => typeof value === "boolean" && OPTIONS.some((option) => option.id === id),
    ),
  );

const filterKnownValues = (values: ValuesState): ValuesState =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([id, value]) => isDefaultsValue(value) && OPTIONS.some((option) => option.id === id),
    ),
  );

const countByGroup = (group: string) => {
  if (group === ALL_GROUP) {
    return OPTIONS.length;
  }

  return OPTIONS.filter((option) => option.group === group).length;
};

const matchesFilters = (option: DefaultsOption, group: string, query: string) => {
  if (group !== ALL_GROUP && option.group !== group) {
    return false;
  }

  if (!query) {
    return true;
  }

  return [
    option.group,
    option.title,
    option.desc,
    option.path.join("."),
    formatManualPath(option.path),
  ]
    .join(" ")
    .toLowerCase()
    .includes(query);
};

const getPresetState = (selected: SelectedState) => {
  if (OPTIONS.every((option) => !selected[option.id])) {
    return "empty";
  }

  if (OPTIONS.every((option) => selected[option.id] === (option.recommended === true))) {
    return "recommended";
  }

  return "custom";
};

const toNix = (options: readonly DefaultsOption[], values: ValuesState) => {
  if (options.length === 0) {
    return "system.defaults = { };";
  }

  const tree: NixNode = {};

  for (const option of options) {
    let cursor = tree;

    for (const [index, part] of option.path.entries()) {
      if (index === option.path.length - 1) {
        cursor[part] = values[option.id];
      } else {
        const next = cursor[part];

        if (isNixNode(next)) {
          cursor = next;
        } else {
          const child: NixNode = {};

          cursor[part] = child;
          cursor = child;
        }
      }
    }
  }

  return `system.defaults = ${renderNixAttrset(tree, 0)};`;
};

const renderNixAttrset = (tree: NixNode, depth: number): string => {
  const indent = "  ".repeat(depth);
  const nextIndent = "  ".repeat(depth + 1);
  const lines = ["{"];

  for (const [key, value] of Object.entries(tree)) {
    if (isNixNode(value)) {
      lines.push(`${nextIndent}${formatAttrName(key)} = ${renderNixAttrset(value, depth + 1)};`);
    } else {
      lines.push(`${nextIndent}${formatAttrName(key)} = ${renderNixValue(value)};`);
    }
  }

  lines.push(`${indent}}`);

  return lines.join("\n");
};

const renderNixValue = (value: unknown) => {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return `"${String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
};

const formatAttrName = (name: string) =>
  /^[A-Za-z_][A-Za-z0-9_-]*$/u.test(name)
    ? name
    : `"${name.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;

const formatManualPath = (path: readonly string[]) =>
  `system.defaults.${path.map(formatAttrName).join(".")}`;

const isDefaultsValue = (value: unknown): value is DefaultsValue =>
  typeof value === "boolean" || typeof value === "number" || typeof value === "string";

const isObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === "[object Object]";

const isNixNode = (value: unknown): value is NixNode => isObject(value);

const isStoredState = (value: unknown): value is StoredState => {
  if (!isObject(value)) {
    return false;
  }

  return (
    (value.selected === undefined || isSelectedState(value.selected)) &&
    (value.values === undefined || isValuesState(value.values))
  );
};

const isSelectedState = (value: unknown): value is SelectedState => {
  if (!isObject(value)) {
    return false;
  }

  return Object.values(value).every((item) => typeof item === "boolean");
};

const isValuesState = (value: unknown): value is ValuesState => {
  if (!isObject(value)) {
    return false;
  }

  return Object.values(value).every(isDefaultsValue);
};
