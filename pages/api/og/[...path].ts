import type { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";
import React from "react";
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import { OpenGraphTemplate } from "~/components/common";
import { posts } from "~/posts/index.json";
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
  const fontPath = path.resolve(
    process.cwd(),
    "./assets/MPLUSRounded1c-Bold.ttf"
  );
  const font = fs.readFileSync(fontPath, { encoding: "base64" });
  const element = React.createElement(OpenGraphTemplate, { title, font });
  const markup = ReactDOMServer.renderToStaticMarkup(element);

  return `<!doctype html>${markup}`;
}

function getTitle(req: NextApiRequest): string {
  const [year, slug] = req.query.path;
  const post = posts.find((post) => post.year === year && post.slug === slug);

  assert(post !== undefined);

  return post.title;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const title = getTitle(req);
    const html = getHtml({ title });
    const viewport = { width: 1200, height: 630 };
    const launchOptions = await getLaunchOptions();
    const browser = await playwright.launchChromium(launchOptions);
    const page = await browser.newPage({ viewport });

    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluateHandle("document.fonts.ready");

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
};
