import NextHead from "next/head";
import { useRouter } from "next/router";

interface CustomHeadProps {
  title?: string;
  description?: string;
}

const siteMeta = {
  title: "tdkn.dev",
  author: "Shun Tedokon",
  ogImage: "twitter-large-card.png",
  description: "Personal blog by Shun Tedokon",
  url:
    process.env.NODE_ENV === "production"
      ? `https://tdkn.dev`
      : "http://localhost:3000",
  social: {
    twitter: "@tdkn_",
  },
};

const CustomHead = ({
  title = siteMeta.title,
  description = siteMeta.description,
}: CustomHeadProps) => {
  const { query, asPath } = useRouter();
  const url = [siteMeta.url, asPath].join("");
  const ogImageUrl =
    query.year && query.slug
      ? `${siteMeta.url}/api/og/${query.year}/${query.slug}`
      : `${siteMeta.url}/${siteMeta.ogImage}`;

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/icon.png" />
      <meta charSet="UTF-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content={siteMeta.social.twitter} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  );
};

export default CustomHead;
