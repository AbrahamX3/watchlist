export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface SelectedTitle {
  id: string;
  type: "MOVIE" | "SERIES";
}
