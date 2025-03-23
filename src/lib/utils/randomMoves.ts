import type { MovesWithType } from '@/components/ui/PokemonCard';
import { capitalizeWords } from './string';

export function getRandomMoves(pokemonName: string, moves: AllPokemonMovesGen9ByPokemon): MovesWithType {
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

  return selectedMoves as MovesWithType;
}

type LearnMethod = 'level-up' | 'tm' | 'egg' | 'evolution' | 'reminder';

export type PokemonMove = {
  name: string;
  learntBy: LearnMethod[];
  levelLearnt: string | null;
  type: string;
  category: string;
  power: string | null;
  accuracy: string | null | 'infinity';
};

export type PokemonMoves = {
  moves: PokemonMove[];
};

export type AllPokemonMovesGen9ByPokemon = {
  [pokemonName: string]: PokemonMoves;
};
