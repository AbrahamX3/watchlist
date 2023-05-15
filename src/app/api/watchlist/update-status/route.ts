import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

interface Body {
  id: string;
  status: "UPCOMING" | "PENDING" | "WATCHING" | "UNFINISHED" | "FINISHED";
}

export async function POST(request: Request) {
  const res: Body = await request.json();

  const data = await prisma.watchlist.update({
    where: {
      id: res.id,
    },
    data: {
      status: res.status,
    },
  });

  return NextResponse.json({
    data,
  });
}
