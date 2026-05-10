import { getPostMarkdown } from "~/lib/mdx";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{
    slug: string;
    year: string;
  }>;
}

export const GET = async (_request: Request, { params }: RouteContext) => {
  const { slug, year } = await params;
  const markdown = await getPostMarkdown(year, slug);

  if (markdown === null) {
    return new Response(null, { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
