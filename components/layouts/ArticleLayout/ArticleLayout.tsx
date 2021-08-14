import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Footer, Header, Profile } from "~/components/common";
import { formatDate, formatTimeAgo } from "~/lib/format-date";

export interface Props {
  children: React.ReactNode;
  frontMatter: { [key: string]: any };
}

const ArticleLayout: React.VFC<Props> = ({ frontMatter, children }) => (
  <Container maxW="container.md">
    <Header />
    <Box pb="2">
      <Heading as="h1" size="xl">
        {frontMatter.title}
      </Heading>
      <Text
        fontSize="sm"
        textAlign="left"
        py="8"
        color={useColorModeValue("gray.500", "gray.400")}
      >
        {formatDate(frontMatter.date)} ({formatTimeAgo(frontMatter.date)})
      </Text>
    </Box>
    <Box as="main" pb="10">
      {children}
    </Box>
    <Profile />
    <Footer />
  </Container>
);

export default ArticleLayout;
