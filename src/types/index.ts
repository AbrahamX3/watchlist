export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface selectedTitle {
  id: string;
  type: "MOVIE" | "SERIES";
}
