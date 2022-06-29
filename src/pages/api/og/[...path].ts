import type { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { OpenGraphTemplate } from "~/components/common";
import PostsConfig from "~/config/posts.config";
import { assert } from "~/lib/assert";

const isDev = process.env.NODE_ENV !== "production";
const isPreview = typeof process.env.BLOG_PREVIEW !== "undefined";

async function getLaunchOptions() {
  if (isDev || isPreview) {
    return {
      args: [],
      executablePath:
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true,
    };
  } else {
    return {};
  }
}

function getHtml({ title }: { title: string }): string {
  const element = React.createElement(OpenGraphTemplate, { title });
  const markup = ReactDOMServer.renderToStaticMarkup(element);

  return `<!doctype html>${markup}`;
}

function getTitle(req: NextApiRequest): string {
  if (!req.query.path) {
    return "Untitled";
  }

  const [year, filename] = [req.query.path].flat();
  const slug = filename.split(".").shift();
  const post = PostsConfig.posts.find(
    (post) => post.year === year && post.slug === slug
  );

  assert(post !== undefined);

  return post.title;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const title = getTitle(req);
    const html = getHtml({ title });
    const viewport = { width: 1200, height: 630 };
    const launchOptions = await getLaunchOptions();
    const browser = await playwright.launchChromium(launchOptions);
    const page = await browser.newPage({ viewport });

    await page.setContent(html, { waitUntil: "networkidle" });

    const buffer = await page.screenshot({ type: "png" });
    await browser.close();

    // Set the s-maxage property which caches the images then on the Vercel edge
    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
    res.setHeader("Content-Type", "image/png");

    // write the image to the response with the specified Content-Type
    res.end(buffer);
  } catch (error) {
    console.error("[Error]: ", error);
    res.status(404).json({ message: "Cannot render og-image" });
  }
}
