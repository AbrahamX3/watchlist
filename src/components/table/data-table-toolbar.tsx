import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/table/data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { genreList, statusList, typeList } from "./watchlist/options";
import { SetState } from "@/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setGlobalFilter: SetState<string>;
}

export function DataTableToolbar<TData>({
  table,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex lg:flex-row flex-col align-middle justify-between">
      <div className="flex gap-2">
        <Input
          placeholder="Search titles..."
          onChange={(event) =>
            setGlobalFilter(
              (event.target as HTMLInputElement).value.toLowerCase()
            )
          }
          className="h-8  lg:w-[250px]"
        />
        <div>
          <DataTableViewOptions table={table} />
        </div>
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            title="Reset Filters"
          >
            <span className="sm:inline-block hidden">Reset</span>
            <X className="sm:ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex align-middle justify-center items-center">
        <div className="flex  flex-wrap sm:flex-row align-middle gap-2">
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statusList}
            />
          )}
          {table.getColumn("type") && (
            <DataTableFacetedFilter
              column={table.getColumn("type")}
              title="Type"
              options={typeList}
            />
          )}
          {table.getColumn("genres") && (
            <DataTableFacetedFilter
              column={table.getColumn("genres")}
              title="Genres"
              options={genreList}
            />
          )}
        </div>
      </div>
    </div>
  );
}
