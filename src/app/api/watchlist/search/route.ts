import { NextResponse } from "next/server";
import { env } from "@/env.mjs";

interface Body {
  query: string;
}
export async function POST(request: Request) {
  const res: Body = await request.json();

  if (!res.query) {
    return NextResponse.json({
      success: false,
      error: "Please provide a query",
    });
  }

  const url = `https://api.themoviedb.org/3/search/multi?query=${res.query}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.MOVIEDB_ACCESS_KEY}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return NextResponse.json({ data });
}
