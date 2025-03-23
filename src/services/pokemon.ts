import { getRandomPokeApiPokemonId } from '@/lib/utils/randomPokemonId';

type PokeApiTypeFromPokemon = {
  type: {
    name: string;
  };
};

export type PokeApiAbilityFromPokemon = {
  ability: {
    name: string;
  };
};

export type PokeApiMoveFromPokemon = {
  move: {
    name: string;
  };
};

type PokeApiArtworkFromPokemon = {
  front_default: string | null;
  front_shiny: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
};

type PokeApiSpritesFromPokemon = {
  other: {
    'official-artwork': PokeApiArtworkFromPokemon;
    showdown: PokeApiArtworkFromPokemon;
  };
};

type PokeApiResponseFromPokemon = {
  name: string;
  types: Array<PokeApiTypeFromPokemon>;
  abilities: Array<PokeApiAbilityFromPokemon>;
  moves: Array<PokeApiMoveFromPokemon>;
  sprites: PokeApiSpritesFromPokemon;
};

export async function getPokemon(gen9PokemonSet: Set<string>): Promise<PokeApiResponseFromPokemon> {
  let pokemonFromPokeApi: PokeApiResponseFromPokemon;
  let pokemonName: string;

  do {
    const pokeApiPokemonId = getRandomPokeApiPokemonId();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeApiPokemonId}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon with id ${pokeApiPokemonId}`);
    }
    pokemonFromPokeApi = await response.json();
    pokemonName = pokemonFromPokeApi.name;
  } while (!gen9PokemonSet.has(pokemonName));

  return pokemonFromPokeApi;
}
