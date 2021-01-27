import type { NextApiRequest, NextApiResponse } from "next";
import * as playwright from "playwright-aws-lambda";
import React from "react";
import path from "path";
import fs from "fs";
import ReactDOMServer from "react-dom/server";
import matter from "gray-matter";
import OpenGraphTemplate from "~/components/OpenGraphTemplate";
import { postFiles } from "~/lib/mdx";

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

function getHtml({ title }): string {
  const doctype = `<!doctype html>`;
  const fontPath = path.resolve(
    process.cwd(),
    "./assets/MPLUSRounded1c-Bold.ttf"
  );
  const font = fs.readFileSync(fontPath, { encoding: "base64" });
  const element = React.createElement(OpenGraphTemplate, { title, font });
  const markup = ReactDOMServer.renderToStaticMarkup(element);

  return `${doctype}${markup}`;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [year, slug] = req.query.path;
  const postFile = postFiles.find(
    (file) => file.year === year && file.slug === slug
  );
  const source = fs.readFileSync(postFile.absolutePath);
  const { data: frontMatter } = matter(source);
  const options = await getLaunchOptions();
  const browser = await playwright.launchChromium(options);
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630,
    },
  });
  const html = getHtml({ title: frontMatter.title });

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.evaluateHandle("document.fonts.ready");

  const data = await page.screenshot({ type: "png" });
  await browser.close();

  // Set the s-maxage property which caches the images then on the Vercel edge
  res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate");
  res.setHeader("Content-Type", "image/png");
  // write the image to the response with the specified Content-Type
  res.end(data);
};
