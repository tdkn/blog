import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { GoogleAnalyticsScript } from "~/lib/google-analytics";

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalyticsScript />
        </Head>
        <body>
          <script src="/noflash.js" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
