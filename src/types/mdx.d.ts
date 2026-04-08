declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    date?: string;
    deprecated?: boolean;
    published?: boolean;
    summary?: string;
    title?: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}
