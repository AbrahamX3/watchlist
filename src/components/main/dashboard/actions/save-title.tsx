"use server";

import { Watchlist } from "@prisma/client";

import { getBaseUrl } from "@/app/utils";
export async function saveTitle({
  id,
  type,
  status,
}: {
  id: string;
  type: "MOVIE" | "SERIES";
  status: "UPCOMING" | "PENDING" | "WATCHING" | "UNFINISHED" | "FINISHED";
}) {
  const response = await fetch(getBaseUrl() + "/api/watchlist/add", {
    method: "POST",
    body: JSON.stringify({
      tmdbId: id,
      type: type,
      status: status,
    }),
  });

  return (await response.json()) as Watchlist;
}
