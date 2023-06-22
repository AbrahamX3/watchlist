import { type Metadata } from "next";

import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/watchlist/public-watchlist-columns";
import { prisma } from "@/server/db";
import {
  typeList,
  statusList,
  genreList,
} from "@/components/table/watchlist/options";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Abraham's Watchlist - Home",
};
export default async function WatchList() {
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
    <main className="flex min-h-screen flex-col items-center justify-center py-8">
      <div className="container mx-auto gap-2 w-full">
        <DataTable columns={columns} data={data} filters={filters} />
      </div>
    </main>
  );
}
