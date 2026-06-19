import { http, HttpResponse } from "msw";

const pokemon = [
  { id: 1, name: "bulbasaur" },
  { id: 2, name: "ivysaur" },
  { id: 3, name: "venusaur" },
  { id: 4, name: "charmander" },
  { id: 5, name: "charmeleon" },
  { id: 6, name: "charizard" },
  { id: 7, name: "squirtle" },
  { id: 8, name: "wartortle" },
  { id: 9, name: "blastoise" },
  { id: 10, name: "caterpie" },
];

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
