const MAX_POKEAPI_POKEMON_ID = 1025;

type RandomSource = () => number;

export function getRandomPokeApiPokemonId(random: RandomSource = Math.random): number {
  const randomValue = random();

  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
    throw new Error(`Random source must return a value from 0 up to, but not including, 1; received ${randomValue}`);
  }

  return Math.floor(randomValue * MAX_POKEAPI_POKEMON_ID) + 1;
}
