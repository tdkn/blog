import { NextResponse } from "next/server";

import { getAllPosts } from "~/lib/mdx";

export const GET = async () => {
  try {
    return NextResponse.json(await getAllPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
};
