import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkEmoji from "remark-emoji";
import remarkImages from "remark-images";

export const Post = defineDocumentType(() => ({
  computedFields: {
    url: {
      resolve: (post) => `/${post._raw.flattenedPath}`,
      type: "string",
    },
  },
  contentType: "mdx",
  fields: {
    date: {
      description: "The date of the post",
      required: true,
      type: "date",
    },
    deprecated: {
      default: false,
      description: "",
      required: false,
      type: "boolean",
    },
    summary: {
      description: "The summary of the post",
      required: false,
      type: "string",
    },
    title: {
      description: "The title of the post",
      required: true,
      type: "string",
    },
  },
  filePathPattern: `**/*.mdx`,
  name: "Post",
}));

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "dracula-soft",
};

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
    remarkPlugins: [remarkImages, remarkEmoji],
  },
});
