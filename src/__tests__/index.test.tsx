import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { mockZennArticlesResponse } from "./fixtures/zenn";
import Home from "../app/(blog)/page";

// Mock Zenn API to avoid external dependencies and ensure consistent test results
vi.mock(import("~/lib/zenn"), () => ({
  getZennArticles: vi.fn<() => Promise<typeof mockZennArticlesResponse>>(async () => {
    const response = await Promise.resolve(mockZennArticlesResponse);

    return response;
  }),
}));

describe(Home, () => {
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
