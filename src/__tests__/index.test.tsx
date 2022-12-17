import { render } from "@testing-library/react";
import { posts } from "~/lib/mdx";
import Home from "~/pages/index";

describe("Home", () => {
  it("renders a Home", () => {
    jest.spyOn(console, "error").mockImplementation();

    render(<Home posts={posts} />);

    expect(console.error).not.toHaveBeenCalled();
  });
  it("renders homepage unchanged", () => {
    const { container } = render(<Home posts={posts} />);

    expect(container).toMatchSnapshot();
  });
});
