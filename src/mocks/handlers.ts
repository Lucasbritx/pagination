import { http, HttpResponse } from "msw";

import pokemonData from "../../pokemon-150.json";

const pokemon = pokemonData.results.map((pokemon) => pokemon);

export const handlers = [
  http.get("/api/pokemon-cursor", ({ request }) => {
    const url = new URL(request.url);

    const cursor = url.searchParams.get("cursor");
    const limit = Number(url.searchParams.get("limit") ?? 3);

    const startIndex = cursor ? Number(cursor) : 0;
    const items = pokemon.slice(startIndex, startIndex + limit);

    const nextIndex = startIndex + limit;
    const nextCursor = nextIndex < pokemon.length ? String(nextIndex) : null;

    return HttpResponse.json({
      items,
      nextCursor,
      hasNextPage: Boolean(nextCursor),
    });
  }),
];
