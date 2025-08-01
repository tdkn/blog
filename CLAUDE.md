# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog powered by Next.js 15 with App Router, MDX for content, and Tailwind CSS for styling. The blog is deployed at https://tdkn.dev.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack
pnpm build            # Build production bundle
pnpm preview          # Build and start production server
pnpm analyze          # Analyze bundle size

# Testing
pnpm test             # Run Vitest tests

# Linting & Formatting
pnpm lint             # Run all linters (ESLint, Prettier, Stylelint, TypeScript)
pnpm lint:eslint      # Run ESLint only
pnpm lint:prettier    # Check Prettier formatting
pnpm lint:stylelint   # Run Stylelint on CSS files
pnpm lint:types       # Run TypeScript type checking

# Fix & Format
pnpm fix              # Run all fixers sequentially
pnpm fix:eslint       # Fix ESLint issues
pnpm fix:stylelint    # Fix Stylelint issues
pnpm fix:prettier     # Format with Prettier
```

## Architecture

### Directory Structure

- `posts/` - MDX blog posts organized by year (e.g., `posts/2024/my-post.mdx`)
- `src/app/` - Next.js App Router pages and API routes
  - `(blog)/` - Blog-related pages with shared layout
  - `(tools)/` - Tool pages with separate layout
  - `api/` - API routes for dynamic content (fonts, logos, OG images)
- `src/components/` - React components
  - `common/` - Shared components (Footer, Header, PostCard, Profile)
  - `mdx-components/` - MDX-specific components
  - `ui/` - Base UI components (Link, Logo)
- `src/lib/` - Utility functions
- `src/styles/` - Global CSS and MDX-specific styles

### Key Patterns

1. **MDX Processing**: Posts are stored as MDX files in `posts/{year}/{slug}.mdx` and processed using `gray-matter` for frontmatter and `next-mdx-remote` for rendering.

2. **Path Aliases**: Use `~/` for imports from `src/` directory (configured in tsconfig.json).

3. **Styling**: Tailwind CSS v4 with PostCSS. MDX content has custom styles in `src/styles/mdx.css`.

4. **Code Highlighting**: Uses `rehype-pretty-code` with Shiki for syntax highlighting in MDX.

5. **Testing**: Vitest with React Testing Library for component tests.

6. **Type Safety**: Strict TypeScript configuration with type checking in lint process.

### MDX Post Structure

Posts require frontmatter with:

- `title` (string): Post title
- `date` (string): ISO date format
- `summary` (string): Brief description
- `deprecated` (boolean, optional): Mark old content

### API Routes

- `/api/font` - Serves custom fonts
- `/api/ip` - Returns client IP
- `/api/logo` - Generates SVG logo with theme support
- `/api/og/[...path]` - Generates Open Graph images

### Build Process

1. Next.js builds with Turbopack in development
2. Pre-commit hooks via Husky run lint-staged
3. GitHub Actions run tests on push
4. Vercel handles production deployments

### Testing

Run `pnpm test` to execute Vitest tests. Test files are located in `src/__tests__/`.
