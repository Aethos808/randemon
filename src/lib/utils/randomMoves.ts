import type { PokemonMovesByName } from '@/lib/validation/pokemonMoves';
import { createPokemonMoves, type PokemonMoves } from '@/types/pokemon';

import { capitalizeWords } from './string';

export function getRandomMoves(pokemonName: string, moves: PokemonMovesByName): PokemonMoves {
  const indices = new Set<number>();

  while (indices.size < 4) {
    indices.add(Math.floor(Math.random() * moves[pokemonName].moves.length));
  }

  const selectedMoves = Array.from(indices).map((index) => {
    return {
      name: capitalizeWords(moves[pokemonName].moves[index].name),
      type: capitalizeWords(moves[pokemonName].moves[index].type),
    };
  });

  return createPokemonMoves(selectedMoves);
}
