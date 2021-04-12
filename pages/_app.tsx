import React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Head } from "~/components/common";
import initGoogleAnalytics from "~/lib/google-analytics";
import "~/styles/main.css";

initGoogleAnalytics();

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
