import { describe, expect, it } from 'vitest';

import { getGen9Pokemon } from './getGen9Pokemon';

describe('getGen9Pokemon', () => {
  it('aggregates the Paldea, Kitakami, and Blueberry Pokédexes', () => {
    const pokemon = getGen9Pokemon();

    expect(pokemon.size).toBe(664);
    expect(pokemon).toContain('sprigatito');
    expect(pokemon).toContain('ogerpon');
    expect(pokemon).toContain('terapagos');
  });

  it('returns a new set for each caller', () => {
    const firstResult = getGen9Pokemon();
    firstResult.delete('sprigatito');

    expect(getGen9Pokemon()).toContain('sprigatito');
  });
});
