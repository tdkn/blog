import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { components } from "~/lib/mdx";
import "~/styles/index.css";

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
