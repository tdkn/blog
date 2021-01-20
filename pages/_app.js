import React from "react";
import initGoogleAnalytics from "~/lib/google-analytics";
import "~/lib/font-awesome";
import "~/styles/index.css";

initGoogleAnalytics();

export default function CustomApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
