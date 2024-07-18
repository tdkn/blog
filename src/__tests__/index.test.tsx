import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "~/app/(blog)/page";

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
