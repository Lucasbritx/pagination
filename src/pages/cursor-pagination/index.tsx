import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PokemonList } from "../../components/PokemonList";
import type { CursorResponse } from "../../types/cursorResponse";

async function fetchPokemonByCursor(cursor: string | null) {
  const params = new URLSearchParams();

  params.set("limit", "10");

  if (cursor) {
    params.set("cursor", cursor);
  }

  const response = await fetch(`/api/pokemon-cursor?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cursor page");
  }

  return response.json() as Promise<CursorResponse>;
}

export function CursorPaginationPage() {
  const [cursor, setCursor] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon-cursor", cursor],
    queryFn: () => fetchPokemonByCursor(cursor),
  });

  console.log(`cursor data - `, data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading Pokémon.</p>;

  return (
    <div>
      <h1>Cursor Pagination</h1>

      <PokemonList pokemons={data?.items} />

      <button
        disabled={!data?.hasNextPage}
        onClick={() => setCursor(data?.nextCursor ?? null)}
      >
        Next cursor
      </button>
    </div>
  );
}
