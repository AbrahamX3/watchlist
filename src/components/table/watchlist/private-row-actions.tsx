"use client";
import { useState } from "react";

import { type Watchlist } from "@prisma/client";
import { Close } from "@radix-ui/react-dialog";
import { type Row } from "@tanstack/react-table";
import { MoreHorizontal, Star } from "lucide-react";

import { updateStatus } from "@/components/main/dashboard/actions/update-status";
import { updateTitle } from "@/components/main/dashboard/actions/update-title";
import SelectStatus from "@/components/main/dashboard/select-status";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PrivateDataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const data = row.original as Watchlist;
  const router = useRouter();
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  function reset() {
    setStatus("");
    setStatusModal(false);
    router.refresh();
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setStatusModal(true)}>
              <span>Update Status</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const res = await updateTitle({
                  id: String(data.tmdbId),
                  type: data.type,
                });

                if (res.success) {
                  toast({
                    title: "Successfully updated title",
                  });
                  reset();
                } else {
                  toast({
                    title: "Failed to update title",
                    description: res.error,
                  });
                  reset();
                }
              }}
            >
              <span>Update Title</span>
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
                <div>
                  {data.title}{" "}
                  <span className="text-muted-foreground">({data.year})</span>
                </div>
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
        onOpenChange={() => {
          setStatusModal(!statusModal);
        }}
      >
        <DialogContent id="update-status">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <div className="grid gap-4 py-4">
              <SelectStatus value={data.status} setStatus={setStatus} />
            </div>
          </DialogHeader>
          <DialogFooter>
            <Close asChild>
              <Button variant="ghost">Close</Button>
            </Close>
            <Button
              type="button"
              onClick={async () =>
                await updateStatus({
                  id: data.id,
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
