import { type Metadata } from "next";

import { DataTable } from "@/components/table/data-table";
import { publicColumns } from "@/components/table/watchlist/public-watchlist-columns";
import { prisma } from "@/server/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Abraham's Watchlist - Home",
};
export default async function WatchList() {
  const data = await prisma.watchlist.findMany({
    orderBy: [
      {
        title: "asc",
      },
      {
        year: "desc",
      },
    ],
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-8">
      <div className="container mx-auto gap-2 w-full">
        <DataTable columns={publicColumns} data={data} />
      </div>
    </main>
  );
}
