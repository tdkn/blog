import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "~/lib/mdx";
import initGoogleAnalytics from "~/lib/google-analytics";
import "~/lib/font-awesome";
import "~/styles/index.css";

initGoogleAnalytics();

function CustomApp({ Component, pageProps }) {
  return (
    <>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}

export default CustomApp;
