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
import { boolean } from "zod";
import { useState } from "react";
import SelectStatus from "@/components/main/dashboard/select-status";
import { updateStatus } from "@/components/main/dashboard/actions/update-status";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PrivateDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const data = row.original as Watchlist;

  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  function reset() {
    setStatus("");
    setStatusModal(false);
  }

  return (
    <>
      <div className="relative">
        <DropdownMenu modal={false}>
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
            <DropdownMenuItem onClick={() => setDescriptionModal(true)}>
              <span>View Description</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusModal(true)}>
              <span>Update Status</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog
        open={descriptionModal}
        onOpenChange={() => setDescriptionModal(!descriptionModal)}
      >
        <DialogContent id="view-description">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <p>
                  {data.title}{" "}
                  <span className="text-muted-foreground">({data.year})</span>
                </p>
                <span className="mr-4 flex align-middle gap-2">
                  <Star className="h-4 w-4" />
                  <span>{data.rating?.toFixed(1)} / 10</span>
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

      <Dialog
        open={statusModal}
        onOpenChange={() => setStatusModal(!statusModal)}
      >
        <DialogContent id="update-status">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription className="text-justify">
              <div className="grid gap-4 py-4">
                <SelectStatus value={data.status} setStatus={setStatus} />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Close asChild>
              <Button variant="ghost">Close</Button>
            </Close>
            <Button
              type="button"
              onClick={async () =>
                await updateStatus({
                  id: data.id as string,
                  status: status as
                    | "UPCOMING"
                    | "PENDING"
                    | "WATCHING"
                    | "UNFINISHED"
                    | "FINISHED",
                }).then(reset)
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
