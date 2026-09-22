import { describe, expect, it } from 'vitest';

import { getRandomPokeApiPokemonId } from './randomPokemonId';

describe('getRandomPokeApiPokemonId', () => {
  it('maps random values to the supported inclusive ID range', () => {
    expect(getRandomPokeApiPokemonId(() => 0)).toBe(1);
    expect(getRandomPokeApiPokemonId(() => 0.999_999)).toBe(1025);
  });

  it.each([-0.1, 1, Number.NaN])('rejects an invalid random value: %s', (randomValue) => {
    expect(() => getRandomPokeApiPokemonId(() => randomValue)).toThrow(
      'Random source must return a value from 0 up to, but not including, 1',
    );
  });
});
