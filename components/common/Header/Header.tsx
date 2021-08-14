import { ButtonGroup, Flex, HStack, Icon, Link } from "@chakra-ui/react";
import {
  faFacebook,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import { DarkModeToggle } from "~/components/common";
import { Logo } from "~/components/ui";

const Header = () => (
  <Flex align="center" py="10" justify="space-between">
    <NextLink href="/">
      <a>
        <Logo />
      </a>
    </NextLink>

    <ButtonGroup>
      <HStack spacing="5" display={{ base: "none", md: "flex" }}>
        <Link href="https://github.com/tdkn" isExternal aria-label="GitHub">
          <Icon
            as={FontAwesomeIcon}
            icon={faGithub}
            display="block"
            transition="color 0.2s"
            _hover={{ color: "gray.600" }}
          />
        </Link>
        <Link href="https://twitter.com/tdkn_" isExternal aria-label="Twitter">
          <Icon
            as={FontAwesomeIcon}
            icon={faTwitter}
            display="block"
            transition="color 0.2s"
            _hover={{ color: "gray.600" }}
          />
        </Link>
        <Link
          href="https://facebook.com/ted0k0n"
          isExternal
          aria-label="Facebook"
        >
          <Icon
            as={FontAwesomeIcon}
            icon={faFacebook}
            display="block"
            transition="color 0.2s"
            _hover={{ color: "gray.600" }}
          />
        </Link>
      </HStack>

      <DarkModeToggle />
    </ButtonGroup>
  </Flex>
);

export default Header;
