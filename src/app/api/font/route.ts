export const runtime = "edge";

async function fetchFont(
  text: string,
  font: string,
): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
    text,
  )}`;

  const css = await fetch(API, {
    headers: {
      // Make sure it returns TTF.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  }).then((res) => res.text());

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (!resource) {
    return null;
  } else {
    return (await fetch(resource[1])).arrayBuffer();
  }
}

export async function GET(req: Request) {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname !== "/api/font") return;

  const font = searchParams.get("font");
  const text = searchParams.get("text");

  if (!font || !text) return;

  const responseBuffer = await fetchFont(text, font);

  return new Response(responseBuffer, {
    headers: {
      "Content-Type": "font/woff",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
