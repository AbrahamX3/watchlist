import {
  AlertCircle,
  CheckCircle2,
  Clapperboard,
  Film,
  HelpCircle,
  PlayCircle,
  XCircle,
} from "lucide-react";

export const statusList = [
  {
    value: "UPCOMING",
    label: "Upcoming",
    icon: AlertCircle,
  },
  {
    value: "PENDING",
    label: "Pending",
    icon: HelpCircle,
  },
  {
    value: "WATCHING",
    label: "Watching",
    icon: PlayCircle,
  },
  {
    value: "UNFINISHED",
    label: "Unfinished",
    icon: XCircle,
  },
  {
    value: "FINISHED",
    label: "Finished",
    icon: CheckCircle2,
  },
];

export const typeList = [
  {
    value: "MOVIE",
    label: "Movie",
    icon: Film,
  },
  {
    value: "SERIES",
    label: "Series",
    icon: Clapperboard,
  },
];
