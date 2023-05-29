"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { saveTitle } from "./actions/save-title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useForm } from "react-hook-form";
import { statusList } from "@/components/table/watchlist/options";
import { useState } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Watchlist } from "@prisma/client";

const formSchema = z.object({
  title: z.string(),
  status: z.string(),
});

export default function AddWatchlistModal({
  fetcher,
}: {
  fetcher: () => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [titleList, setTitleList] = useState([]);

  const { toast } = useToast();

  async function fetchTitle(search: string) {
    const res = await fetch("/api/watchlist/search", {
      method: "POST",
      body: JSON.stringify({
        query: search,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch title.");
    }

    return await res.json();
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      status: "PENDING",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const id = values.title.split("-")[0];
    const type = values.title.split("-")[1] as "MOVIE" | "SERIES";

    saveTitle({
      id,
      type,
      status: values.status,
    }).then(() => {
      form.reset();
      setSearch("");
      setTitleList([]);

      toast({
        title: "Added Title to Watchlist",
      });

      fetcher();
    });
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="search" className="text-right">
            Search
          </Label>
          <Input
            id="search"
            autoComplete="off"
            type="search"
            className="col-span-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setTitleList([]);
              if (search) {
                return fetchTitle(search).then((data) => {
                  if (data.data.results.length > 0) {
                    return setTitleList(data.data.results);
                  }
                  toast({
                    title: "No results found",
                  });
                });
              }
              toast({
                title: "Enter a search term",
              });
            }}
          >
            Search
          </Button>
        </div>
        <Separator orientation="horizontal" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="truncate w-full">
                        <SelectValue placeholder="Search titles..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea
                        className={`w-full ${titleList ? "h-40" : "h-full"}`}
                      >
                        {titleList.length > 0 ? (
                          titleList.map((item: any) => {
                            if (item.media_type === "movie") {
                              return (
                                <SelectItem
                                  key={item.id}
                                  value={`${item.id}-MOVIE`}
                                >
                                  <div className="flex justify-between align-middle items-center w-full gap-4">
                                    {item.poster_path !== null ? (
                                      <Image
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.title}
                                        width={15}
                                        height={50}
                                        style={{
                                          width: "auto",
                                          height: "auto",
                                        }}
                                        className="rounded-md"
                                      />
                                    ) : (
                                      <div className="w-[10px] h-[30px] bg-gray-200" />
                                    )}
                                    <span
                                      className="truncate max-w-[200px] min-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap"
                                      title={item.title}
                                    >
                                      {item.title}
                                    </span>
                                    <span className="w-[30px] text-right justify-self-end">
                                      {item.vote_average.toFixed(1)}
                                    </span>
                                  </div>
                                </SelectItem>
                              );
                            }

                            if (item.media_type === "tv") {
                              return (
                                <SelectItem
                                  key={item.id}
                                  value={`${item.id}-SERIES`}
                                >
                                  <div className="flex justify-between items-center align-middle w-full gap-4">
                                    {item.poster_path !== null ? (
                                      <Image
                                        src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                        alt={item.name}
                                        width={15}
                                        height={50}
                                        style={{
                                          width: "auto",
                                          height: "auto",
                                        }}
                                        className="rounded-md"
                                      />
                                    ) : (
                                      <div className="w-[10px] h-[30px] bg-gray-200" />
                                    )}
                                    <span
                                      className="truncate max-w-[200px] min-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap"
                                      title={item.name}
                                    >
                                      {item.name}
                                    </span>
                                    <span className="w-[30px] text-right justify-self-end">
                                      {item.vote_average.toFixed(1)}
                                    </span>
                                  </div>
                                </SelectItem>
                              );
                            }
                          })
                        ) : (
                          <SelectItem value="null" disabled>
                            <span className="truncate">No results</span>
                          </SelectItem>
                        )}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="truncate w-full">
                        <SelectValue placeholder="Select status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectSeparator />
                      <ScrollArea className="h-40 w-full">
                        {statusList.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            <span title={item.label}>{item.label}</span>
                          </SelectItem>
                        ))}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
