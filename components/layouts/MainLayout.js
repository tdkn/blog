import React from "react";
import BaseHeader from "~/components/BaseHeader";
import BaseFooter from "~/components/BaseFooter";
import CustomHead from "~/components/CustomHead";
import styles from "~/styles/layouts/MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.main}>
      <CustomHead title="tdkn.dev" />

      <BaseHeader />

      <aside className="flex items-center pb-5">
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

      <main>{children}</main>

      <BaseFooter />
    </div>
  );
};

export default MainLayout;
