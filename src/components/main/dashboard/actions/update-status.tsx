"use server";

import { getBaseUrl } from "@/app/utils";
export async function updateStatus({
  id,
  status,
}: {
  id: string;
  status: "UPCOMING" | "PENDING" | "WATCHING" | "UNFINISHED" | "FINISHED";
}) {
  const response = await fetch(getBaseUrl() + "/api/watchlist/update-status", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      status: status,
    }),
  });

  const watchlist = await response.json();
}
