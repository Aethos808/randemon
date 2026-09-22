import type { PokemonMovesByName } from '@/lib/validation/pokemonMoves';
import { createPokemonMoves, type PokemonMoves } from '@/types/pokemon';

import { capitalizeWords } from './string';

type RandomSource = () => number;

function getRandomIndex(length: number, random: RandomSource): number {
  const randomValue = random();

  if (randomValue < 0 || randomValue >= 1) {
    throw new Error(`Random source must return a value from 0 up to, but not including, 1; received ${randomValue}`);
  }

  return Math.floor(randomValue * length);
}

export function getRandomMoves(
  pokemonName: string,
  movesByPokemon: PokemonMovesByName,
  random: RandomSource = Math.random,
): PokemonMoves {
  const moveRecord = movesByPokemon[pokemonName];

  if (!moveRecord) {
    throw new Error(`No move data found for Pokémon "${pokemonName}"`);
  }

  if (moveRecord.moves.length < 4) {
    throw new Error(`Pokémon "${pokemonName}" requires at least four moves; received ${moveRecord.moves.length}`);
  }

  const availableMoves = [...moveRecord.moves];
  const selectedMoves = [];

  for (let selection = 0; selection < 4; selection += 1) {
    const selectedIndex = getRandomIndex(availableMoves.length, random);
    const [selectedMove] = availableMoves.splice(selectedIndex, 1);

    selectedMoves.push({
      name: capitalizeWords(selectedMove.name),
      type: capitalizeWords(selectedMove.type),
    });
  }

  return createPokemonMoves(selectedMoves);
}
