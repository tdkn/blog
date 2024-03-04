import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
import remarkImages from "remark-images";

import { components } from "~/components/mdx-components";
import "~/styles/mdx.css";

type MdxProps = {
  code: string;
};

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: "dracula-soft",
};

export default function Mdx({ code }: MdxProps) {
  return (
    <MDXRemote
      components={components}
      options={{
        mdxOptions: {
          format: "mdx",
          rehypePlugins: [[rehypePrettyCode as any, rehypePrettyCodeOptions]],
          remarkPlugins: [remarkImages],
        },
      }}
      source={code}
    />
  );
}
