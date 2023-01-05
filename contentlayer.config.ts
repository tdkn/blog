import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkEmoji from "remark-emoji";
import remarkImages from "remark-images";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    summary: {
      type: "string",
      description: "The summary of the post",
      required: false,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}));

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "dracula-soft",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
};

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkImages, remarkEmoji],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});
