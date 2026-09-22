import { describe, expect, it } from 'vitest';

import { parsePokemonMoves } from './pokemonMoves';

describe('parsePokemonMoves', () => {
  it('keeps the move fields used by team generation', () => {
    expect(
      parsePokemonMoves({
        pikachu: {
          moves: [{ name: 'Thunderbolt', type: 'Electric', ignored: true }],
        },
      }),
    ).toEqual({
      pikachu: {
        moves: [{ name: 'Thunderbolt', type: 'Electric' }],
      },
    });
  });

  it('rejects malformed move records with Pokémon context', () => {
    expect(() =>
      parsePokemonMoves({
        pikachu: {
          moves: [{ name: 'Thunderbolt' }],
        },
      }),
    ).toThrow('Invalid move data for pikachu at index 0');
  });
});
