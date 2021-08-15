import { Box, Tag } from "@chakra-ui/react";
import theme from "prism-react-renderer/themes/dracula";
import Highlight from "./Highlight";

const CodeBlock = (props: any) => {
  const { children, className, ln } = props;
  const language = className?.replace(/language-/, "");
  const rawCode = children.trim();

  return (
    <Box position="relative" zIndex="0">
      <Box
        pt={10}
        pb={5}
        rounded="8px"
        my="8"
        bg="#282A36"
        px="0"
        overflow="hidden"
      >
        <Highlight
          codeString={rawCode}
          language={language}
          theme={theme}
          metastring={ln}
          showLines={true}
        />
      </Box>
      <Tag
        top="0"
        position="absolute"
        zIndex="1"
        borderBottomLeftRadius="none"
        borderTopRightRadius="none"
        textTransform="uppercase"
      >
        {language}
      </Tag>
    </Box>
  );
};

export default CodeBlock;
