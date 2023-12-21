export function GET(request: Request) {
  // NOTE: `0.0.0.0` is fallback for localhost or non Vercel deployments
  const ip = request.headers.get("x-forwarded-for") || "0.0.0.0";

  return new Response(ip, { status: 200 });
}
