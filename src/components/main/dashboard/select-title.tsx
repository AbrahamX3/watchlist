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
import { SetState, selectedTitle } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import useSWR from "swr";

export default async function SelectTitle({
  search,
  setTitle,
  id,
  value,
}: {
  search: string;
  setTitle: SetState<selectedTitle>;
  id: string;
  value: string;
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
      suspense: true,
    }
  );

  function handleSelectedTitle(value: string) {
    const id = value.split("-")[0];
    const type = value.split("-")[1] as "MOVIE" | "SERIES";

    setTitle({
      id: id,
      type: type,
    });
  }

  if (search && !isLoading) {
    return (
      <div className="col-span-3">
        <Select
          onValueChange={(value) => handleSelectedTitle(value)}
          value={value}
        >
          <SelectTrigger id={id} className="truncate">
            <SelectValue placeholder="Search Results" />
          </SelectTrigger>
          <SelectContent className="w-[380px]">
            <SelectGroup>
              <SelectLabel>Movies and Series</SelectLabel>
              <SelectSeparator />
              <ScrollArea
                className={`w-full ${
                  data && data.data.results.length > 0 ? "h-40" : "h-full"
                }`}
              >
                {!isLoading ? (
                  data && data.data.results.length > 0 ? (
                    data.data.results.map((item: any) => {
                      if (item.media_type === "movie") {
                        return (
                          <SelectItem key={item.id} value={`${item.id}-MOVIE`}>
                            <div className="flex justify-between align-middle items-center w-full gap-4">
                              {item.poster_path !== null ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                  alt={item.title}
                                  width={30}
                                  height={30}
                                  className="rounded-md h-[30px] object-cover w-auto"
                                />
                              ) : (
                                <div className="w-[30px] h-[30px] bg-gray-200" />
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
                          <SelectItem key={item.id} value={`${item.id}-SERIES`}>
                            <div className="flex justify-between items-center align-middle w-full gap-4">
                              {item.poster_path !== null ? (
                                <Image
                                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                                  alt={item.name}
                                  width={30}
                                  height={30}
                                  className="rounded-md h-[30px] object-cover w-auto"
                                />
                              ) : (
                                <div className="w-[30px] h-[30px] bg-gray-200" />
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
                  )
                ) : (
                  <div>Loading...</div>
                )}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  }

  return null;
}
