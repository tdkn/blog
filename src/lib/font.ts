export async function fetchFont(text: string, font: string): Promise<ArrayBuffer | null> {
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", font);
  url.searchParams.set("text", text);

  const response = await fetch(url, {
    headers: {
      // Prefer an OpenType/TrueType response that `ImageResponse` can embed.
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load Google Fonts CSS: ${response.status}`);
  }

  const css = await response.text();
  const resource = /src: url\((.+)\) format\('(opentype|truetype)'\)/.exec(css);

  if (!resource) {
    return null;
  }

  const fontResponse = await fetch(resource[1]);

  if (!fontResponse.ok) {
    throw new Error(`Failed to load font binary: ${fontResponse.status}`);
  }

  return fontResponse.arrayBuffer();
}
