import Router from "next/router";

export const GoogleAnalyticsScript = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GA_TRACKING_ID}');
        `
      }}
    />
  </>
);

export default function initGoogleAnalytics() {
  Router.events.on("routeChangeComplete", url => {
    setTimeout(() => {
      window.gtag("config", process.env.GA_TRACKING_ID, {
        page_location: url,
        page_title: document.title
      });
    }, 0);
  });
}
