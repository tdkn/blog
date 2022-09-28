import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // NOTE: `0.0.0.0` is fallback for localhost or non Vercel deployments
  const ip = req.headers["x-forwarded-for"] || "0.0.0.0";

  return res.send(ip);
}
