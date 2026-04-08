import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BlogPostPage from "~/app/(blog)/[year]/[slug]/page";
import { getAllPosts } from "~/lib/mdx";

describe("MDX posts", () => {
  it("reads frontmatter exports from local posts", async () => {
    const posts = await getAllPosts();
    const post = posts.find(
      (entry) => entry.year === "2026" && entry.slug === "personal-agent-skills-in-project",
    );

    expect(post).toMatchObject({
      slug: "personal-agent-skills-in-project",
      summary:
        "Project-specific な Agent Skills をグローバル gitignore を使ってプロジェクト内に配置しつつ、リポジトリには含めない方法。",
      title: "個人用の Agent Skills を Git に乗せずプロジェクト内に置く",
      url: "/2026/personal-agent-skills-in-project",
      year: "2026",
    });
  });

  it("renders a blog post from an imported MDX module", async () => {
    render(
      await BlogPostPage({
        params: Promise.resolve({
          slug: "how-to-use-yarn-patch",
          year: "2021",
        }),
      }),
    );

    expect(screen.getByRole("heading", { level: 1, name: "yarn patch の使い方" })).toBeTruthy();
    expect(screen.getByText("手順")).toBeTruthy();
    expect(screen.getByText(/patch:puppeteer-core@\^5\.5\.0/)).toBeTruthy();
  });
});
