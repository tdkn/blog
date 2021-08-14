import { ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { GoogleAnalyticsScript } from "~/components/common";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config });

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <GoogleAnalyticsScript />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
