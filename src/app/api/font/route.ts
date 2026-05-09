import { fetchFont } from "~/lib/font";

export const runtime = "edge";

export const GET = async (req: Request) => {
  const { pathname, searchParams } = new URL(req.url);

  if (pathname !== "/api/font") {
    return new Response(null, { status: 404 });
  }

  const font = searchParams.get("font");
  const text = searchParams.get("text");

  if (font === null || text === null) {
    return new Response(null, { status: 400 });
  }

  const responseBuffer = await fetchFont(text, font);

  if (responseBuffer === null) {
    return new Response(null, { status: 404 });
  }

  return new Response(responseBuffer, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "font/woff",
    },
  });
};
