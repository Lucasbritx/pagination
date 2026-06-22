import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonList } from "../../components/PokemonList";
import type { CursorResponse } from "../../types/cursorResponse";

async function fetchPokemonByCursor(cursor: string | null) {
  const params = new URLSearchParams();

  params.set("limit", "3");

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await fetch(`/api/pokemon-cursor?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cursor page");
  }

  return response.json() as Promise<CursorResponse>;
}

export function CursorInfinitePage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon-cursor-infinite"],
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) => fetchPokemonByCursor(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading Pokémon.</p>;

  const pokemons = data?.pages.flatMap((page) => page.items);

  return (
    <div>
      <h1>Cursor + Infinite Query</h1>

      <PokemonList pokemons={pokemons} />

      <button
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </div>
  );
}
