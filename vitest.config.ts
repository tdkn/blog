import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vitest/config";

const dirname = import.meta.dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      rehypePlugins: [[rehypePrettyCode, { theme: "dracula-soft" }]],
      remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "~": resolve(dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    server: {
      deps: {
        inline: [/@fortawesome/],
      },
    },
  },
});
