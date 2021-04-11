import type { AppProps } from "next/app";
import React from "react";
import { Head } from "~/components/common";
import initGoogleAnalytics from "~/lib/google-analytics";
import "~/styles/main.css";

initGoogleAnalytics();

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
}
