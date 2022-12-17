import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { ComponentPropsWithoutRef, FC } from "react";

const Link: FC<ComponentPropsWithoutRef<"a">> = (props) => {
  return (
    <ChakraLink
      as={NextLink}
      color={useColorModeValue("black.500", "yellow.200")}
      fontWeight="bold"
      {...props}
    />
  );
};

export default Link;
