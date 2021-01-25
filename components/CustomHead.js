import React from "react";
import NextHead from "next/head";
import { useRouter } from "next/router";
import { string } from "prop-types";

const siteMeta = {
  title: "tdkn.dev",
  author: "Shun Tedokon",
  ogImage: "twitter-large-card.png",
  description: "Personal blog by Shun Tedokon",
  url: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000",
  social: {
    twitter: "tdkn_",
  },
};

const getTitle = ({ title }) =>
  title ? `${title} | ${siteMeta.title}` : siteMeta.title;

const getOgImageUrl = ({ query }) =>
  query.year && query.slug
    ? `${siteMeta.url}/api/og/${query.year}/${query.slug}`
    : `${siteMeta.url}/${siteMeta.ogImage}`;

const CustomHead = (props) => {
  const router = useRouter();
  const title = getTitle(props);
  const ogImageUrl = getOgImageUrl(router);

  return (
    <NextHead>
      <title>{title}</title>
      <link rel="icon" href="/icon.png" />
      <meta charSet="UTF-8" />
      <meta name="description" content={props.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={props.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={props.description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:site" content={`@${siteMeta.social.twitter}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  );
};

CustomHead.propTypes = {
  title: string,
  description: string,
  url: string,
};

CustomHead.defaultProps = {
  description: siteMeta.description,
  url: siteMeta.url,
};

export default CustomHead;
