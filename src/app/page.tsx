import { Inter } from "next/font/google";
import { columns } from "@/components/table/watchlist-columns";
import { DataTable } from "@/components/table/data-table";
import { prisma } from "@/server/db";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abraham's Watchlist - Home",
};
export default async function WatchList() {
  const data = await prisma.watchlist.findMany();

  return (
    <main
      style={{ fontFamily: inter.style.fontFamily }}
      className="flex min-h-screen flex-col items-center justify-between md:p-24"
    >
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
