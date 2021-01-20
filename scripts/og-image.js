require("@babel/register");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const Template = require("./template");

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
      headless: chrome.headless
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

async function generateOgImage({ title, filePath }) {
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

  await browser.close();
}

module.exports = generateOgImage;
