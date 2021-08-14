import { Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "~/components/ui";

const Profile = () => (
  <HStack as="aside">
    <Avatar
      name="Shun Tedokon"
      bg="yellow.200"
      src="/avatar.jpg"
      size="lg"
      mr="2"
    />
    <Text fontSize="sm">
      Personal blog by{" "}
      <Link href="https://twitter.com/tdkn_">Shun Tedokon</Link>.
      <br />I write about design, programming, and thinking.
    </Text>
  </HStack>
);

export default Profile;
