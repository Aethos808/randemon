import type { PokeApiAbilityFromPokemon } from '@/services/pokemon';

type RandomSource = () => number;

export function getRandomAbility(abilities: PokeApiAbilityFromPokemon[], random: RandomSource = Math.random): string {
  if (abilities.length === 0) {
    throw new Error('Cannot select an ability from an empty list');
  }

  const randomValue = random();

  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
    throw new Error(`Random source must return a value from 0 up to, but not including, 1; received ${randomValue}`);
  }

  const randomIndex = Math.floor(randomValue * abilities.length);
  return abilities[randomIndex].ability.name;
}
