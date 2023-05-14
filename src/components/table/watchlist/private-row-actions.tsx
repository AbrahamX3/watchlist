"use client";

import { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pen, Star, Tags, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Watchlist } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Close } from "@radix-ui/react-dialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PrivateDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const data = row.original as Watchlist;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <span>View Description</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between">
              <p>
                {data.title}{" "}
                <span className="text-muted-foreground">({data.year})</span>
              </p>
              <span className="mr-4 flex align-middle gap-2">
                <Star className="h-4 w-4" />
                <span>{data.rating} / 10</span>
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-justify">
            {data.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Close asChild>
            <Button variant="ghost">Close</Button>
          </Close>
          <Button>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.imdb.com/title/${data.imdbId}`}
            >
              <span>View on IMDb</span>
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
