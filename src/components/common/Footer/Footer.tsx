import { Stack, Text } from "@chakra-ui/react";
import { getYear } from "date-fns";

const Footer = () => (
  <Stack as="footer" align="center" py="20">
    <Text fontSize="sm" color="gray.500">
      Copyright © {getYear(new Date())} Shun Tedokon.
    </Text>
  </Stack>
);

export default Footer;
