import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PokemonList } from "../../components/PokemonList";

const pageSize = 20;

export function CursorPaginationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1);
  const offset = (page - 1) * pageSize;

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon-offset", page],
    queryFn: async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageSize}`,
      );
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;

  function goToPage(nextPage: number) {
    setSearchParams({ page: String(nextPage) });
  }

  return (
    <div>
      <h1>Cursor Pagination</h1>

      <PokemonList pokemons={data.results} />

      <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
        Previous
      </button>

      <span> Page {page} </span>

      <button disabled={!data.next} onClick={() => goToPage(page + 1)}>
        Next
      </button>
    </div>
  );
}
