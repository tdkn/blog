import { NextResponse } from "next/server";

import { getAllPosts } from "~/lib/mdx";

export async function GET() {
  try {
    return NextResponse.json(await getAllPosts());
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
