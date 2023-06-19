import { Suspense } from "react";

import AddWatchlistModal from "@/components/main/dashboard/add-watchlist-modal";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/watchlist/private-watchlist-columns";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/server/db";
import {
  genreList,
  statusList,
  typeList,
} from "@/components/table/watchlist/options";

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

  const filters = [
    {
      columnId: "type",
      title: "Type",
      options: typeList,
    },
    {
      columnId: "status",
      title: "Status",
      options: statusList,
    },
    {
      columnId: "genres",
      title: "Genres",
      options: genreList,
    },
  ];

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
          <DataTable columns={columns} data={data} filters={filters} />
        </div>
      </main>
    </>
  );
}
