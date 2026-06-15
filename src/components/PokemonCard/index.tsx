export function PokemonCard({ pokemon }: any) {
  console.log("poke - ", pokemon);
  // TODO change to suspense API
  //if (isLoading) return <p>Loading...</p>;
  const pokemonIndex = pokemon.url.split("/").filter(Boolean).at(-1);
  const photoUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;
  return (
    <div key={pokemon.name}>
      <img src={photoUrl} />
      <p>{pokemon.name}</p>
    </div>
  );
}
