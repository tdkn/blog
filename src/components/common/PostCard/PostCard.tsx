import {
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { formatDate } from "~/lib/format-date";
import type { Post } from "~/types/post";

export interface Props {
  post: Post;
}

const PostCard: React.VFC<Props> = ({ post }) => (
  <LinkBox as="article" py="5">
    <Text
      fontSize="sm"
      color={useColorModeValue("gray.500", "gray.400")}
      fontWeight="medium"
    >
      {formatDate(post.date)}
    </Text>
    <Heading size="md" color={useColorModeValue("black.500", "yellow.200")}>
      <LinkOverlay as={NextLink} href={post.url}>
        {post.title}
      </LinkOverlay>
    </Heading>
  </LinkBox>
);

export default PostCard;
