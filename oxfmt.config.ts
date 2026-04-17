import { defineConfig } from "oxfmt";

export default defineConfig({
  ignorePatterns: [
    "build",
    "coverage",
    ".next",
    "out",
    "pnpm-lock.yaml",
    ".pnpm-store",
    ".vercel",
  ],
  printWidth: 80,
  sortImports: true,
  sortPackageJson: false,
  sortTailwindcss: {},
});
