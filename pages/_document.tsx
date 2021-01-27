import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import GoogleAnalyticsScript from "~/components/GoogleAnalyticsScript";

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ja">
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
