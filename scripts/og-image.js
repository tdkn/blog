import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import chrome from "chrome-aws-lambda";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Template from "./template";

const isDev = process.env.NODE_ENV !== "production";
const isPreview = typeof process.env.BLOG_PREVIEW !== "undefined";

async function getOptions() {
  if (isDev || isPreview) {
    return {
      args: [],
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      headless: true
    };
  } else {
    return {
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: true
    };
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

export default async function generateOgImage({ title, filePath }) {
  const options = await getOptions();
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  const html = getHtml({ title });

  const fileName = filePath
      .split("/")
      .pop()
      .replace(/\.mdx$/, "")

  await page.setContent(html, { waitUntil: ["domcontentloaded"] });
  await page.evaluateHandle("document.fonts.ready");
  await page.setViewport({ width: 2048, height: 1170 });
  await page.screenshot({
    path: path.resolve(process.cwd(), `./public/og/${fileName}.png`),
    type: "png",
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  return await browser.close();
}
