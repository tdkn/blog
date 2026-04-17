import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { Image } from "~/components/mdx-image";
import { classNames } from "~/lib/style";

const components = {
  a: ({ children, className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a className={classNames("dark:text-yellow-200", className)} {...props}>
      {children}
    </a>
  ),
  h1: ({ children, className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={classNames("mt-10 mb-5 text-4xl font-bold", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={classNames("mt-10 mb-5 text-3xl font-bold", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={classNames("mt-10 mb-5 text-3xl font-bold", className)}
      {...props}
    >
      {children}
    </h3>
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className={classNames("my-4 w-full border-t border-gray-300", className)}
      {...props}
    />
  ),
  Image,
  kbd: ({ className, ...props }: ComponentPropsWithoutRef<"kbd">) => (
    <kbd className={classNames("", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={classNames("", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={classNames("my-2 ml-6 list-decimal", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={classNames("my-2", className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={classNames(
        "mt-6 mb-4 overflow-x-auto rounded-lg bg-slate-800 py-4",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={classNames("my-2 ml-6 list-disc", className)} {...props} />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
