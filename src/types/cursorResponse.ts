import type { Pokemon } from "./pokemon";

export type CursorResponse = {
  items: Pokemon[];
  nextCursor: string | null;
  hasNextPage: boolean;
};
