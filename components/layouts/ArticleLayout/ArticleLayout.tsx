import React from "react";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import { Profile, Header, Footer } from "~/components/common";
import styles from "./ArticleLayout.module.css";

const ArticleLayout = ({ frontMatter, children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <div className="pb-8">
        <h1>{frontMatter.title}</h1>
        <span className="text-sm text-gray-600">
          {formatDate(frontMatter.date)} ({formatTimeAgo(frontMatter.date)})
        </span>
      </div>
      <main className="pb-10">{children}</main>
      <Profile />
      <Footer />
    </div>
  );
};

export default ArticleLayout;
