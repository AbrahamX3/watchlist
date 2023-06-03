import useSWR from "swr";

import { getBaseUrl } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { type SetState, type SelectedTitle } from "@/types";

export default function SelectTitle({
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
