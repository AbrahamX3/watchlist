import { type Table } from "@tanstack/react-table";
import { X, type LucideIcon } from "lucide-react";

import { DataTableViewOptions } from "@/components/table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type SetState } from "@/types";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface Options {
  label: string;
  value: string;
  icon?: LucideIcon;
}

export interface Filter {
  columnId: string;
  title: string;
  options: Options[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  setGlobalFilter: SetState<string>;
  globalFilter: string;
  filters?: Filter[];
}

export function DataTableToolbar<TData>({
  table,
  setGlobalFilter,
  globalFilter,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div className="flex flex-col justify-between rounded-md align-middle lg:flex-row">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar..."
          value={globalFilter || ""}
          onChange={(event) =>
            setGlobalFilter(
              (event.target as HTMLInputElement).value.toLowerCase()
            )
          }
          className="h-8 lg:w-[250px]"
        />
        <DataTableViewOptions table={table} />
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
              setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
            title="Reset Filters"
          >
            <span className="hidden sm:inline-block">Reset</span>
            <X className="h-4 w-4 sm:ml-2" />
          </Button>
        )}
      </div>
      <div className="flex items-center justify-center pt-4 align-middle lg:pt-0">
        <div className="flex flex-wrap gap-2 align-middle sm:flex-row">
          {filters?.map((filter) => (
            <DataTableFacetedFilter
              key={filter.columnId}
              column={table.getColumn(filter.columnId)}
              title={filter.title}
              options={filter.options}
            />
          )) || null}
        </div>
      </div>
    </div>
  );
}
