import { Footer, Header } from "~/components/common";
import "~/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="bg-white text-slate-800 dark:bg-[#1a202c] dark:text-slate-300">
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
