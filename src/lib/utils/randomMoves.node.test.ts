import { describe, expect, it, vi } from 'vitest';

import type { PokemonMoveData, PokemonMovesByName } from '@/lib/validation/pokemonMoves';

import { getRandomMoves } from './randomMoves';

const createMove = (name: string): PokemonMoveData => ({
  name,
  type: 'normal',
});

const createMoveData = (moveCount: number): PokemonMovesByName => ({
  eevee: {
    moves: Array.from({ length: moveCount }, (_, index) => createMove(`move ${index + 1}`)),
  },
});

describe('getRandomMoves', () => {
  it('selects and formats four moves without replacement', () => {
    const randomValues = [0, 0.99, 0.5, 0];
    let randomCall = 0;

    const moves = getRandomMoves('eevee', createMoveData(5), () => randomValues[randomCall++]);

    expect(moves).toEqual([
      { name: 'Move 1', type: 'Normal' },
      { name: 'Move 5', type: 'Normal' },
      { name: 'Move 3', type: 'Normal' },
      { name: 'Move 2', type: 'Normal' },
    ]);
    expect(new Set(moves.map((move) => move.name))).toHaveLength(4);
  });

  it.each([0, 1, 2, 3])('rejects a record containing %i moves before using randomness', (moveCount) => {
    const random = vi.fn(() => 0);

    expect(() => getRandomMoves('eevee', createMoveData(moveCount), random)).toThrow(
      `Pokémon "eevee" requires at least four moves; received ${moveCount}`,
    );
    expect(random).not.toHaveBeenCalled();
  });

  it('rejects a missing Pokémon move record', () => {
    expect(() => getRandomMoves('missing', {})).toThrow('No move data found for Pokémon "missing"');
  });

  it('rejects values outside the random source contract', () => {
    expect(() => getRandomMoves('eevee', createMoveData(4), () => 1)).toThrow(
      'Random source must return a value from 0 up to, but not including, 1; received 1',
    );
  });
});
