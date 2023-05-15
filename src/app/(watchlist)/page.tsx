import { publicColumns } from "@/components/table/watchlist/public-watchlist-columns";
import { DataTable } from "@/components/table/data-table";
import { prisma } from "@/server/db";
import { Metadata } from "next";

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
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <div className="container mx-auto py-10">
        <DataTable columns={publicColumns} data={data} />
      </div>
    </main>
  );
}
