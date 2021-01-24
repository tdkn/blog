import fs from "fs";
import path from "path";
import * as playwright from "playwright-aws-lambda";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Template from "./template";

const isDev = process.env.NODE_ENV !== "production";
const isPreview = typeof process.env.BLOG_PREVIEW !== "undefined";

async function getLaunchOptions() {
  if (isDev || isPreview) {
    return {
      args: [],
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true
    };
  } else {
    return {};
  }
}

function getHtml({ title }) {
  const doctype = `<!doctype html>`;
  const fontPath = path.resolve(process.cwd(), "./scripts/MPLUSRounded1c-Bold.ttf");
  const font = fs.readFileSync(fontPath, { encoding: "base64" });
  const markup = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Template, { title, font })
  );

  return `${doctype}${markup}`;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default async function generateOgImage({ title, filePath }) {
  try {
    await sleep(10000);
    const launchOptions = await getLaunchOptions();
    const browser = await playwright.launchChromium(launchOptions);
    const page = await browser.newPage();
    const html = getHtml({ title });
    const fileName = filePath
      .split("/")
      .pop()
      .replace(/\.mdx$/, "");

    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluateHandle("document.fonts.ready");
    await page.setViewportSize({ width: 2048, height: 1170 });
    await page.screenshot({
      path: path.resolve(process.cwd(), `./public/og/${fileName}.png`),
      type: "png",
      clip: { x: 0, y: 0, width: 1200, height: 630 }
    });

    await browser.close();
  } catch (error) {
    console.error(`❌ Error while generating og-image: ${filePath}`, error);
    throw error;
  }
}
