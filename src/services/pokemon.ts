import { getRandomPokeApiPokemonId } from '@/lib/utils/randomPokemonId';

import { fetchPokeApiJson, type PokeApiRequestOptions } from './pokeApi';

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

type PokeApiArtworkFromPokemon = {
  front_default: string | null;
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
  sprites: PokeApiSpritesFromPokemon;
};

type GetPokemonOptions = PokeApiRequestOptions & {
  getPokemonId?: () => number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseNamedResource(value: unknown, field: string): { name: string } {
  if (!isRecord(value) || typeof value.name !== 'string' || value.name.length === 0) {
    throw new Error(`Invalid PokeAPI Pokémon response: ${field} must contain a name`);
  }

  return { name: value.name };
}

function parseFrontDefault(value: unknown, field: string): PokeApiArtworkFromPokemon {
  if (!isRecord(value) || (typeof value.front_default !== 'string' && value.front_default !== null)) {
    throw new Error(`Invalid PokeAPI Pokémon response: ${field}.front_default must be a string or null`);
  }

  return { front_default: value.front_default };
}

function parsePokemonResponse(value: unknown): PokeApiResponseFromPokemon {
  if (!isRecord(value) || typeof value.name !== 'string' || value.name.length === 0) {
    throw new Error('Invalid PokeAPI Pokémon response: name must be a non-empty string');
  }

  if (!Array.isArray(value.types) || value.types.length < 1 || value.types.length > 2) {
    throw new Error('Invalid PokeAPI Pokémon response: types must contain one or two entries');
  }

  if (!Array.isArray(value.abilities) || value.abilities.length === 0) {
    throw new Error('Invalid PokeAPI Pokémon response: abilities must contain at least one entry');
  }

  if (!isRecord(value.sprites) || !isRecord(value.sprites.other)) {
    throw new Error('Invalid PokeAPI Pokémon response: sprites.other is required');
  }

  return {
    name: value.name,
    types: value.types.map((entry, index) => {
      if (!isRecord(entry)) {
        throw new Error(`Invalid PokeAPI Pokémon response: types[${index}] must be an object`);
      }

      return { type: parseNamedResource(entry.type, `types[${index}].type`) };
    }),
    abilities: value.abilities.map((entry, index) => {
      if (!isRecord(entry)) {
        throw new Error(`Invalid PokeAPI Pokémon response: abilities[${index}] must be an object`);
      }

      return { ability: parseNamedResource(entry.ability, `abilities[${index}].ability`) };
    }),
    sprites: {
      other: {
        showdown: parseFrontDefault(value.sprites.other.showdown, 'sprites.other.showdown'),
        'official-artwork': parseFrontDefault(
          value.sprites.other['official-artwork'],
          'sprites.other.official-artwork',
        ),
      },
    },
  };
}

export async function getPokemon(
  gen9PokemonSet: Set<string>,
  options: GetPokemonOptions = {},
): Promise<PokeApiResponseFromPokemon> {
  const { getPokemonId = getRandomPokeApiPokemonId, ...requestOptions } = options;
  let pokemonFromPokeApi: PokeApiResponseFromPokemon;
  let pokemonName: string;

  do {
    const pokeApiPokemonId = getPokemonId();
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeApiPokemonId}`;
    const responseData = await fetchPokeApiJson(endpoint, {
      ...requestOptions,
      cache: 'no-store',
      context: `Pokémon ${pokeApiPokemonId}`,
    });

    pokemonFromPokeApi = parsePokemonResponse(responseData);
    pokemonName = pokemonFromPokeApi.name;
  } while (!gen9PokemonSet.has(pokemonName));

  return pokemonFromPokeApi;
}
