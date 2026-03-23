const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonPage(limit, offset) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);

  if (!response.ok) {
    throw new Error("Kunne ikke hente Pokemon-listen");
  }

  return response.json();
}

export async function getPokemonDetails(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Kunne ikke hente Pokemon-detaljer");
  }

  return response.json();
}

export async function getPokemonListWithDetails(limit, offset) {
  const pageData = await getPokemonPage(limit, offset);

  const detailedList = await Promise.all(
    pageData.results.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.url);

      return {
        name: pokemon.name,
        url: pokemon.url,
        id: details.id,
        sprite: details.sprites.front_default,
        types: details.types,
      };
    })
  );

  return {
    results: detailedList,
    next: pageData.next,
  };
}