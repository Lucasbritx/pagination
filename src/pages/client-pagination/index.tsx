import { useState } from "react";
import { PokemonList } from "../../components/PokemonList";
import { useQuery } from "@tanstack/react-query";

const pageSize = 20;

export function ClientPaginationPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-client"],
    queryFn: async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const start = (page - 1) * pageSize;
  const pokemons = data.results.slice(start, start + pageSize);

  return (
    <div>
      <h1>Client Pagination</h1>

      <PokemonList pokemons={pokemons} />

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      <span> Page {page} </span>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
