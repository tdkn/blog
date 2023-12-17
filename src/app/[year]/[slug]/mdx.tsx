import { useMDXComponent } from "next-contentlayer/hooks";

import { components } from "~/components/mdx-components";
import "~/styles/mdx.css";

type MdxProps = {
  code: string;
};

export default function Mdx({ code }: MdxProps) {
  const MDXComponent = useMDXComponent(code);

  return <MDXComponent components={components} />;
}
