import type { MovesWithType } from '@/components/ui/PokemonCard';
import type { PokeApiMoveFromPokemon } from '@/services/pokemon';
import { capitalizeWords } from './string';

async function getMoveType(moveName: string): Promise<string> {
  const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch move type for ${moveName}`);
  }
  const data = await response.json();
  return data.type.name;
}

export async function getRandomMoves(moves: PokeApiMoveFromPokemon[]): Promise<MovesWithType> {
  const indices = new Set<number>();
  while (indices.size < 4) {
    indices.add(Math.floor(Math.random() * moves.length));
  }

  const selectedMoves = await Promise.all(
    Array.from(indices).map(async (index) => {
      const moveName = moves[index].move.name;
      const type = await getMoveType(moveName);

      return {
        name: capitalizeWords(moveName),
        type,
      };
    }),
  );

  return selectedMoves as MovesWithType;
}
