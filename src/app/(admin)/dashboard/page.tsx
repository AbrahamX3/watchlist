import { DataTable } from "@/components/table/data-table";
import { prisma } from "@/server/db";
import { privateColumns } from "@/components/table/watchlist/private-watchlist-columns";
import AddWatchlistModal from "@/components/main/dashboard/add-watchlist-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  async function fetchTableData() {
    "use server";

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

    return data;
  }

  const data = await fetchTableData();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center py-8">
        <div className="container mx-auto gap-2 w-full">
          <div className="my-2 rounded-md w-full flex justify-between">
            <p className="text-2xl font-bold">My Watchlist</p>
            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              <AddWatchlistModal fetcher={fetchTableData} />
            </Suspense>
          </div>
          <DataTable columns={privateColumns} data={data} />
        </div>
      </main>
    </>
  );
}
