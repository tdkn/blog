import { Box } from "@chakra-ui/react";
import theme from "prism-react-renderer/themes/dracula";
import Highlight from "./Highlight";

const CodeBlock = (props: any) => {
  const { children, className, ln } = props;
  const language = className?.replace(/language-/, "");
  const rawCode = children.trim();

  return (
    <Box py={5}>
      <Highlight
        codeString={rawCode}
        language={language}
        theme={theme}
        metastring={ln}
        showLines={false}
      />
    </Box>
  );
};

export default CodeBlock;
