import React from "react";
import { DateTime } from "luxon";
import BaseHeader from "~/components/BaseHeader";
import CustomHead from "~/components/CustomHead";
import BaseFooter from "~/components/BaseFooter";
import Profile from "~/components/Profile";
import styles from "./ArticleLayout.module.css";

const ArticleLayout = ({ frontMatter, children }) => {
  return (
    <div className={styles.root}>
      <CustomHead title={frontMatter.title} description={frontMatter.summary} />
      <BaseHeader />
      <div className="pb-8">
        <span className="text-sm text-gray-600">
          {DateTime.fromISO(frontMatter.date).toRelative()}
        </span>
        <h1>{frontMatter.title}</h1>
      </div>
      <main className="pb-10">{children}</main>
      <Profile />
      <BaseFooter />
    </div>
  );
};

export default ArticleLayout;
