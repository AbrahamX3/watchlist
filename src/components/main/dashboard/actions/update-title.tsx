"use server";

import { getBaseUrl } from "@/app/utils";
export async function updateTitle({
  id,
  type,
}: {
  id: string;
  type: "MOVIE" | "SERIES";
}) {
  const response = await fetch(getBaseUrl() + "/api/watchlist/update", {
    method: "POST",
    body: JSON.stringify({
      tmdbId: id,
      type: type,
    }),
  });

  const data = (await response.json()) as { success: boolean; error?: string };
  return data;
}
