import { getBaseUrl } from "@/app/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/ui/select";
import { SetState, SelectedTitle } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import useSWR from "swr";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default async function SelectTitle({
  search,
  setTitle,
  id,
}: {
  search: string;
  setTitle: SetState<SelectedTitle>;
  id: string;
}) {
  const fetcher = (url: string) =>
    fetch("/api/watchlist/search", {
      method: "POST",
      body: JSON.stringify({
        query: search,
      }),
    }).then((res) => res.json());

  const { data, isLoading, mutate } = useSWR(
    getBaseUrl() + "/api/watchlist/search",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
    }
  );

  if (search && !isLoading) {
    return (
      <form className="col-span-3">
        <Button type="submit">Select Title</Button>
      </form>
    );
  }

  return null;
}
