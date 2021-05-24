import React from "react";
import { Profile, Header, Footer } from "~/components/common";
import styles from "./MainLayout.module.css";

export interface Props {
  children: React.ReactNode;
}

const MainLayout: React.VFC<Props> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <Profile />
      <main className="pt-5">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
