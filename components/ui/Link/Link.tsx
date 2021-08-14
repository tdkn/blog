import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import NextLink, { LinkProps } from "next/link";

const Link: React.FC<LinkProps> = ({ href, children }) => {
  const color = useColorModeValue("black.500", "yellow.200");

  return (
    <NextLink href={href} passHref>
      <ChakraLink color={color} fontWeight="bold">
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
