const path = require("path");
const generateOgImage = require("./scripts/og-image");
const withMdxEnhanced = require("next-mdx-enhanced")({
  layoutPath: "components/layouts",
  remarkPlugins: [require("remark-images"), require("remark-emoji")],
  rehypePlugins: [require("@mapbox/rehype-prism")],
  extendFrontMatter: {
    process: (mdxContent, { layout, ...frontMatter }) => {
      const url = frontMatter.__resourcePath.replace(/\.mdx$/, "");
      return {
        ...frontMatter,
        layout: layout || "ArticleLayout",
        url,
        ogImage: `/${url.replace("/", "_")}.png`
      };
    }
  },
  onContent: ({ title, url }) => {
    if (process.env.NODE_ENV === "production") {
      generateOgImage({
        title: title,
        filePath: url.replace("/", "_")
      }).then(() => console.log("🌈 og:image created"));
    }
  }
});

const config = {
  pageExtensions: ["js", "md", "mdx"],
  webpack(config) {
    config.resolve.alias["~"] = path.resolve(__dirname);

    return config;
  }
};

module.exports = withMdxEnhanced(config);
