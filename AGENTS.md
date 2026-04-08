# AGENTS.md

This file provides guidance for AI coding agents working with code in this repository.

## Project Overview

Personal blog powered by Next.js 16 with App Router, React 19, MDX for content, and Tailwind CSS for styling. The blog is deployed at https://tdkn.dev.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build production bundle
pnpm preview          # Build and start production server
pnpm analyze          # Analyze bundle size

# Testing
pnpm test             # Run Vitest (TZ=Asia/Tokyo)

# Linting & Formatting
pnpm lint             # Run all linters (Oxlint, oxfmt, Stylelint, TypeScript)
pnpm lint:oxlint      # Run Oxlint only
pnpm lint:oxfmt       # Check oxfmt formatting
pnpm lint:stylelint   # Run Stylelint on CSS files
pnpm lint:types       # Run TypeScript type checking

# Fix & Format
pnpm fix              # Run all fixers sequentially
pnpm fix:oxlint       # Fix Oxlint issues
pnpm fix:stylelint    # Fix Stylelint issues
pnpm fix:oxfmt        # Format with oxfmt
```

## Architecture

### Directory Structure

- `posts/` - MDX blog posts organized by year (e.g., `posts/2024/my-post.mdx`)
- `src/app/` - Next.js App Router pages and API routes
  - `(blog)/` - Blog-related pages with shared layout
  - `(tools)/` - Tool pages (e.g. GitHub slash command helper) with separate layout
  - `api/` - API routes for dynamic content (fonts, logos, OG images, post list)
- `src/components/` - Shared React components (flat layout; e.g. header, footer, post-card, command-menu)
- `src/contexts/` - React context providers (e.g. posts)
- `src/lib/` - Utility functions (MDX loading, dates, Zenn integration, etc.)
- `src/styles/` - Global CSS and MDX-specific styles
- `src/types/` - TypeScript declarations (e.g. `*.mdx` module types)

### Key Patterns

1. **MDX Processing**: Posts live under `posts/{year}/{slug}.mdx`. `@next/mdx` compiles MDX with `remark-frontmatter` and `remark-mdx-frontmatter` (named export `frontmatter`). Posts are enumerated with `glob`, then loaded via dynamic `import()`. See `src/lib/mdx.ts`.

2. **Path Aliases**: Use `~/` for imports from `src/` (configured in `tsconfig.json`).

3. **Styling**: Tailwind CSS v4 with PostCSS. MDX content uses `src/styles/mdx.css`.

4. **Code Highlighting**: `rehype-pretty-code` with Shiki (theme `dracula-soft` in `next.config.mjs`).

5. **Testing**: Vitest with React Testing Library; tests run with `TZ=Asia/Tokyo`.

6. **Type Safety**: Strict TypeScript; type checking is part of the lint script.

### MDX Post Structure

Frontmatter fields used by `normalizePostFrontmatter` in `src/lib/mdx.ts`:

- `title` (string): Post title
- `date` (string): ISO date format
- `summary` (string): Brief description
- `deprecated` (boolean, optional): Mark old content
- `published` (boolean, optional): Include in listings; defaults to `true` when omitted

### API Routes

- `/api/font` - Serves custom fonts
- `/api/ip` - Returns client IP
- `/api/logo` - Generates SVG logo with theme support
- `/api/og/[...path]` - Generates Open Graph images
- `/api/posts` - JSON list of published posts (`getAllPosts()`)

### Build Process

1. Next.js dev server uses Turbopack (`next dev --turbopack`)
2. Pre-commit hooks via Husky run lint-staged
3. GitHub Actions run tests on push
4. Vercel handles production deployments

### Testing

Run `pnpm test` for Vitest. Test files live under `src/__tests__/`.
