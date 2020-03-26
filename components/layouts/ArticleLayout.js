import React from "react";
import { DateTime } from "luxon";
import BaseHeader from "~/components/BaseHeader";
import BaseFooter from "~/components/BaseFooter";
import CustomHead from "~/components/CustomHead";
import styles from "~/styles/layouts/ArticleLayout.module.css";

const ArticleLayout = frontMatter => {
  return ({ children }) => {
    return (
      <div className={styles.article}>
        <CustomHead
          title={frontMatter.title}
          description={frontMatter.summary}
          ogImage={frontMatter.ogImage}
        />

        <BaseHeader />

        <div className={styles.header}>
          <h1>{frontMatter.title}</h1>
          <p className="text-sm text-gray-600">
            {DateTime.fromJSDate(frontMatter.date).toRelative()}
          </p>
        </div>

        <main className="pb-10">{children}</main>

        <aside className="flex items-center py-5">
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div className="text-sm">
            <p>
              Personal blog by{" "}
              <a
                className="font-bold leading-none"
                href="https://twitter.com/tdkn_"
              >
                Shun Tedokon
              </a>
              .
            </p>
            <p>I write about design, programming, and thinking.</p>
          </div>
        </aside>

        <BaseFooter />
      </div>
    );
  };
};

export default ArticleLayout;
