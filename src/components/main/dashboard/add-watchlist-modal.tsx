"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedState, useDebouncedValue } from "@mantine/hooks";
import SelectTitle from "./select-title";
import { Skeleton } from "@/components/ui/skeleton";
import SelectStatus from "./select-status";
import { Separator } from "@/components/ui/separator";
import { SetState, selectedTitle } from "@/types";
import { saveTitle } from "./actions/save-title";

export default function AddWatchlistModal() {
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [title, setTitle] = useState<selectedTitle>();
  const [status, setStatus] = useState<string>("");

  function reset() {
    setStatus("");
    setSearch("");
    setQuery("");
    setTitle(undefined);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add to Watchlist</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add to Watchlist </DialogTitle>
          <DialogDescription>
            Add movies or series to the watchlist
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="search" className="text-right">
              Search
            </Label>
            <Input
              id="search"
              autoComplete="off"
              type="search"
              className="col-span-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline" onClick={() => setSearch(query)}>
              Search
            </Button>
          </div>
          <Separator orientation="horizontal" />
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            {search ? (
              <>
                <Suspense
                  fallback={
                    <Skeleton className="h-10 w-full col-span-3 rounded-md" />
                  }
                >
                  {/* @ts-expect-error Async Server Component */}
                  <SelectTitle
                    id="title"
                    search={search}
                    setTitle={setTitle as SetState<selectedTitle>}
                  />
                </Suspense>
              </>
            ) : (
              <Skeleton className="h-10 w-full col-span-3 rounded-md" />
            )}
          </div>
          <SelectStatus value={status} setStatus={setStatus} />
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={async () =>
              await saveTitle({
                id: title?.id as string,
                type: title?.type as "MOVIE" | "SERIES",
                status: status,
              }).then(reset)
            }
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
