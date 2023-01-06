"use client";
import { NextSeo } from "next-seo";
import { GoogleTagManagerScript } from "~/components/common";
import config from "~/config/seo.config";

export default function Head() {
  return (
    <>
      <NextSeo {...config} useAppDir={true} />
      <GoogleTagManagerScript />
    </>
  );
}
