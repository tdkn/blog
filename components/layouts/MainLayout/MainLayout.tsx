import { Container } from "@chakra-ui/react";
import React from "react";
import { Footer, Header, Profile } from "~/components/common";

export interface Props {
  children: React.ReactNode;
}

const MainLayout: React.VFC<Props> = ({ children }) => {
  return (
    <Container maxW="container.md">
      <Header />
      <Profile />
      <main className="pt-5">{children}</main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
