import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

const Link: FC<ComponentPropsWithoutRef<"a">> = ({ href = "", children }) => {
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
