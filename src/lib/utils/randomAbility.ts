import type { PokeApiAbilityFromPokemon } from '@/services/pokemon';

import { getRandomValue, type RandomSource } from './random';

export function getRandomAbility(abilities: PokeApiAbilityFromPokemon[], random: RandomSource = Math.random): string {
  if (abilities.length === 0) {
    throw new Error('Cannot select an ability from an empty list');
  }

  const randomValue = getRandomValue(random, 'selecting an ability');
  const randomIndex = Math.floor(randomValue * abilities.length);
  return abilities[randomIndex].ability.name;
}
