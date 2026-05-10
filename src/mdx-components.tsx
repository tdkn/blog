import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { Image } from "~/components/mdx-image";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";

const components = {
  Image,
  a: ({ children, className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a className={cn("text-primary underline-offset-4 hover:underline", className)} {...props}>
      {children}
    </a>
  ),
  h1: ({ children, className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1 className={cn("font-heading mt-10 mb-5 text-4xl font-semibold", className)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("font-heading mt-10 mb-5 text-3xl font-semibold", className)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3 className={cn("font-heading mt-10 mb-5 text-3xl font-semibold", className)} {...props}>
      {children}
    </h3>
  ),
  hr: ({ className }: ComponentPropsWithoutRef<"hr">) => (
    <Separator className={cn("my-4", className)} />
  ),
  kbd: ({ className, ...props }: ComponentPropsWithoutRef<"kbd">) => (
    <kbd className={cn("rounded border bg-muted px-1 py-0.5 text-xs", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cn("my-2 ml-6 list-decimal", className)} {...props} />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("my-2", className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn("mt-6 mb-4 overflow-x-auto rounded-lg bg-muted py-4", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cn("my-2 ml-6 list-disc", className)} {...props} />
  ),
} satisfies MDXComponents;

export const useMDXComponents = (): MDXComponents => components;
