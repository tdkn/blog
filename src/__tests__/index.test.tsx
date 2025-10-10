import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "~/app/(blog)/page";

import { mockZennArticlesResponse } from "./fixtures/zenn";

// Mock Zenn API to avoid external dependencies and ensure consistent test results
vi.mock("~/lib/zenn", () => ({
  getZennArticles: vi.fn(() => Promise.resolve(mockZennArticlesResponse)),
}));

describe("Home", () => {
  it("renders a Home", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {
      /* no-op */
    });

    render(await Home());

    expect(console.error).not.toHaveBeenCalled();
  });
  it("renders homepage unchanged", async () => {
    const { container } = render(await Home());

    expect(container).toMatchSnapshot();
  });
});
