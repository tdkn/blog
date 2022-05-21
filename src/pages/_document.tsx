import { ColorModeScript, extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { GoogleTagManagerScript } from "~/components/common";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <GoogleTagManagerScript />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
