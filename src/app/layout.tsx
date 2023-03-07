import { Metadata } from "next";
import Script from "next/script";
import { Footer, Header } from "~/components/common";
import "~/styles/globals.css";

export function generateMetadata(): Metadata {
  const ogImageUrl =
    process.env.NODE_ENV === "production"
      ? "https://tdkn.dev/twitter-large-card.png"
      : "http://localhost:3000/twitter-large-card.png";

  return {
    title: "tdkn.dev",
    openGraph: {
      type: "website",
      url: "https://tdkn.dev",
      title: "tdkn.dev",
      description: "Shun Tedokon's Personal Website",
      locale: "ja_jp",
      siteName: "tdkn.dev",
      images: [{ url: ogImageUrl }],
    },
    twitter: {
      site: "@tdkn_",
      creator: "@tdkn_",
      card: "summary_large_image",
      images: [{ url: ogImageUrl }],
    },
    viewport: { width: "device-width", initialScale: 1 },
    appleWebApp: {
      title: "tdkn.dev",
      capable: true,
      statusBarStyle: "black-translucent",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
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
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <div className="container mx-auto max-w-3xl px-4">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
