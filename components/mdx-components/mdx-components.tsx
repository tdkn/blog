import {
  Box,
  Divider,
  Heading,
  Kbd,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { MDXProviderComponentsProp } from "@mdx-js/react";
import { Link } from "~/components/ui";
import CodeBlock from "./CodeBlock";
import InlineCode from "./InlineCode";

export const MDXComponents: MDXProviderComponentsProp = {
  h1: (props) => <Heading as="h1" size="xl" mt={10} mb={5} {...props} />,
  h2: (props) => <Heading as="h2" size="lg" mt={10} mb={5} {...props} />,
  h3: (props) => <Heading as="h3" size="md" mt={10} mb={5} {...props} />,
  ul: (props) => <UnorderedList my={2} {...props} />,
  ol: (props) => <OrderedList my={2} {...props} />,
  p: (props) => <Text my={2} {...props} />,
  li: ListItem,
  kbd: Kbd,
  pre: Box,
  code: CodeBlock,
  inlineCode: InlineCode,
  a: Link,
  hr: Divider,
};
