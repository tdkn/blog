import type { AppProps } from "next/app";
import React from "react";
import initGoogleAnalytics from "~/lib/google-analytics";
import "~/styles/index.css";

initGoogleAnalytics();

export default function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
