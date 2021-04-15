import React from "react";
import { DateTime } from "luxon";
import { Profile, Header, Footer } from "~/components/common";
import styles from "./ArticleLayout.module.css";

const ArticleLayout = ({ frontMatter, children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className="pb-8">
        <span className="text-sm text-gray-600">
          {DateTime.fromISO(frontMatter.date).toRelative()}
        </span>
        <h1>{frontMatter.title}</h1>
      </div>
      <main className="pb-10">{children}</main>
      <Profile />
      <Footer />
    </div>
  );
};

export default ArticleLayout;
