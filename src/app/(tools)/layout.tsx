import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon.ico" },
      { type: "image/svg+xml", url: "/icon.svg" },
    ],
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://tdkn.dev"),
  openGraph: {
    description: "Shun Tedokon's Personal Website",
    images: "/twitter-large-card.png",
    locale: "ja_jp",
    siteName: "tdkn.dev",
    title: "tdkn.dev",
    type: "website",
    url: "https://tdkn.dev",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
        </Script>

        <noscript>
          <iframe
            height="0"
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            style={{ display: "none", visibility: "hidden" }}
            width="0"
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
