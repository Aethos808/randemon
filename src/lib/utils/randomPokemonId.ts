import { getRandomValue, type RandomSource } from './random';

const MAX_POKEAPI_POKEMON_ID = 1025;

export function getRandomPokeApiPokemonId(random: RandomSource = Math.random): number {
  const randomValue = getRandomValue(random, 'selecting a Pokémon');
  return Math.floor(randomValue * MAX_POKEAPI_POKEMON_ID) + 1;
}
