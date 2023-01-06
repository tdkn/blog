import type { MDXComponents } from "mdx/types";
import { classNames } from "~/lib/style";
import Image from "./Image";

export const components: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={classNames("mt-10 mb-5 text-4xl font-bold", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h1
      className={classNames("mt-10 mb-5 text-3xl font-bold", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h1
      className={classNames("mt-10 mb-5 text-3xl font-bold", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={classNames("my-2 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={classNames("my-2 ml-6 list-decimal", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={classNames("my-2", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={classNames("", className)} {...props} />
  ),
  kbd: ({ className, ...props }) => (
    <kbd className={classNames("", className)} {...props} />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={classNames(
        "mt-6 mb-4 overflow-x-auto rounded-lg  bg-slate-800 py-4",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }) => (
    <a className={classNames("dark:text-yellow-200", className)} {...props} />
  ),
  hr: ({ className, ...props }) => (
    <div
      className={classNames("my-4 w-full border-t border-gray-300", className)}
      {...props}
    />
  ),
  Image,
};
