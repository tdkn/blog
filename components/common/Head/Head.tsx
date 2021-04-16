import React from "react";
import NextHead from "next/head";
import { DefaultSeo } from "next-seo";
import config from "~/seo.config";
import { useRouter } from "next/router";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://tdkn.dev"
    : "http://localhost:3000";

const Head: React.VFC = () => {
  const { query } = useRouter();
  const ogImageUrl =
    query.year && query.slug
      ? `${baseUrl}/api/og/${query.year}/${query.slug}`
      : `${baseUrl}/twitter-large-card.png`;

  return (
    <>
      <DefaultSeo {...config} />
      <NextHead>
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:image" content={ogImageUrl} />
      </NextHead>
    </>
  );
};

export default Head;
