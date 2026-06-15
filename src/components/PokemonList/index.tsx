import { PokemonCard } from "../PokemonCard";

export function PokemonList({ pokemons }: any) {
  //if (isLoading) return <p>Loading...</p>;
  console.log("pokemons - ", pokemons);

  if (!pokemons) return null;

  return (
    <div>
      {pokemons.map((pokemon: any) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}
