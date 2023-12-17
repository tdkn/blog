import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "~/app/page";

describe("Home", () => {
  it("renders a Home", () => {
    vi.spyOn(console, "error").mockImplementation(() => {
      /* no-op */
    });

    render(<Home />);

    expect(console.error).not.toHaveBeenCalled();
  });
  it("renders homepage unchanged", () => {
    const { container } = render(<Home />);

    expect(container).toMatchSnapshot();
  });
});
