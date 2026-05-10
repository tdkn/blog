import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getAllPosts, getPostMarkdown } from "~/lib/mdx";
import { GET } from "../app/api/markdown/[year]/[slug]/route";
import BlogPostPage from "../app/(blog)/[year]/[slug]/page";

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

  it("reads markdown source for a local post", async () => {
    const markdown = await getPostMarkdown("2026", "personal-agent-skills-in-project");

    expect(markdown).toContain(
      'title: "個人用の Agent Skills を Git に乗せずプロジェクト内に置く"',
    );
    expect(markdown).toContain("## 背景");
  });

  it("returns markdown from the markdown route handler", async () => {
    const response = await GET(
      new Request("http://localhost/api/markdown/2026/personal-agent-skills-in-project"),
      {
        params: Promise.resolve({
          slug: "personal-agent-skills-in-project",
          year: "2026",
        }),
      },
    );

    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    await expect(response.text()).resolves.toContain("## 背景");
  });

  it("returns not found for missing markdown posts", async () => {
    const response = await GET(new Request("http://localhost/api/markdown/2999/missing-post"), {
      params: Promise.resolve({
        slug: "missing-post",
        year: "2999",
      }),
    });

    expect(response.status).toBe(404);
  });
});
