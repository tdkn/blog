import { Metadata, Viewport } from "next";
import Script from "next/script";

import { CommandMenu } from "~/components/command-menu";
import { Footer, Header } from "~/components/common";
import { PostsProvider } from "~/contexts/PostsContext";
import "~/styles/globals.css";

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export function generateMetadata(): Metadata {
  return {
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "tdkn.dev",
    },
    icons: {
      apple: "/apple-touch-icon.png",
      icon: [
        { url: "/favicon.ico" },
        { type: "image/svg+xml", url: "/icon.svg" },
      ],
    },
    manifest: "/site.webmanifest",
    metadataBase: new URL(
      process.env.NODE_ENV === "production"
        ? "https://tdkn.dev"
        : "http://localhost:3000",
    ),
    openGraph: {
      description: "Shun Tedokon's Personal Website",
      images: "/twitter-large-card.png",
      locale: "ja_jp",
      siteName: "tdkn.dev",
      title: "tdkn.dev",
      type: "website",
      url: "https://tdkn.dev",
    },
    title: "tdkn.dev",
    twitter: {
      card: "summary_large_image",
      creator: "@tdkn_",
      images: "/twitter-large-card.png",
      site: "@tdkn_",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="bg-white text-slate-800 dark:bg-[#1a202c] dark:text-slate-300">
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

        <PostsProvider>
          <div className="container mx-auto max-w-3xl px-4">
            <Header />
            {children}
            <Footer />
          </div>
          <CommandMenu />
        </PostsProvider>
      </body>
    </html>
  );
}
