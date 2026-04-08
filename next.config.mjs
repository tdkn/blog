// @ts-check
import createMDX from "@next/mdx";

const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", { theme: "dracula-soft" }]],
    remarkPlugins: [
      "remark-frontmatter",
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  async redirects() {
    return [
      {
        destination: "https://github.com/tdkn",
        permanent: false,
        source: "/github",
      },
      {
        destination: "https://twitter.com/tdkn_",
        permanent: false,
        source: "/twitter",
      },
      {
        destination: "https://bsky.app/profile/tdkn.bsky.social",
        permanent: false,
        source: "/bluesky",
      },
      {
        destination: "https://mastodon.social/@tdkn",
        permanent: false,
        source: "/mastodon",
      },
      {
        destination: "https://facebook.com/shun.tedokon",
        permanent: false,
        source: "/facebook",
      },
    ];
  },
};

export default withMDX(nextConfig);
