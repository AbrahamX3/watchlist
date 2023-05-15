import { DataTable } from "@/components/table/data-table";
import { prisma } from "@/server/db";
import { privateColumns } from "@/components/table/watchlist/private-watchlist-columns";
import AddWatchlistModal from "@/components/main/dashboard/add-watchlist-modal";

export default async function Dashboard() {
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
    <>
      <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
        <div className="container mx-auto py-10">
          <div className="my-2 rounded-md w-full flex justify-between">
            <p className="text-2xl font-bold">My Watchlist</p>
            <AddWatchlistModal />
          </div>
          <DataTable columns={privateColumns} data={data} />
        </div>
      </main>
    </>
  );
}
