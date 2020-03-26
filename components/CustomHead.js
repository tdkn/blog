import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

const siteMeta = {
  title: "tdkn",
  author: "Shun Tedokon",
  image: "/twitter-large-card.png",
  description: "Personal blog by Shun Tedokon",
  url: "https://tdkn.dev",
  social: {
    twitter: "tdkn_"
  }
};

const CustomHead = props => (
  <NextHead>
    <title>
      {props.title ? `${props.title} | ${siteMeta.title}` : siteMeta.title}
    </title>
    <link rel="icon" href="/icon.png" />
    <meta charSet="UTF-8" />
    <meta name="description" content={props.description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:url" content={props.url} />
    <meta property="og:title" content={props.title || ""} />
    <meta property="og:description" content={props.description} />
    <meta name="twitter:title" content={props.title || ""} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:site" content={`@${siteMeta.social.twitter}`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={`${siteMeta.url}${props.ogImage}`} />
    <meta property="og:image" content={`${siteMeta.url}${props.ogImage}`} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </NextHead>
);

CustomHead.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

CustomHead.defaultProps = {
  description: siteMeta.description,
  url: siteMeta.url,
  ogImage: siteMeta.image
};

export default CustomHead;
