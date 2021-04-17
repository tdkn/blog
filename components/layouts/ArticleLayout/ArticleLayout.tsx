import React from "react";
import { formatDate, formatTimeAgo } from "~/lib/format-date";
import { Profile, Header, Footer } from "~/components/common";
import styles from "./ArticleLayout.module.css";

export interface Props {
  children: React.ReactNode;
  frontMatter: { [key: string]: any };
}

const ArticleLayout: React.VFC<Props> = ({ frontMatter, children }) => (
  <div className={styles.root}>
    <Header />
    <div className="pb-8">
      <span className="text-sm text-gray-400">
        {formatDate(frontMatter.date)} ({formatTimeAgo(frontMatter.date)})
      </span>
      <h1>{frontMatter.title}</h1>
    </div>
    <main className="pb-10">{children}</main>
    <Profile />
    <Footer />
  </div>
);

export default ArticleLayout;
