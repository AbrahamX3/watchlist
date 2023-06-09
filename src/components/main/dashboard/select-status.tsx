import { useState } from "react";

import { statusList } from "@/components/table/watchlist/options";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type SetState } from "@/types";

export default function SelectStatus({
  setStatus,
  value,
}: {
  setStatus: SetState<string>;
  value: string;
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>(value);

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="status" className="text-right">
        Status
      </Label>
      <div className="col-span-3">
        <Select
          onValueChange={(value) => {
            setStatus(value);
            setSelectedStatus(value);
          }}
          value={selectedStatus}
        >
          <SelectTrigger id="status" className="truncate">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectSeparator />
              <ScrollArea className="h-40 w-full">
                {statusList.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <span title={item.label}>{item.label}</span>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
