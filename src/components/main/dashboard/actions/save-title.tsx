"use server";

import { getBaseUrl } from "@/app/utils";
import { Watchlist } from "@prisma/client";
export async function saveTitle({
  id,
  type,
  status,
}: {
  id: string;
  type: "MOVIE" | "SERIES";
  status: string;
}) {
  const response = await fetch(getBaseUrl() + "/api/watchlist/add", {
    method: "POST",
    body: JSON.stringify({
      tmdbId: id,
      type: type,
      status: status,
    }),
  });

  const watchlist: Watchlist = await response.json();

  return watchlist;
}
