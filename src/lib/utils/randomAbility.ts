import type { PokeApiAbilityFromPokemon } from '@/services/pokemon';

export function getRandomAbility(abilities: PokeApiAbilityFromPokemon[]): string {
  const randomIndex = Math.floor(Math.random() * abilities.length);
  return abilities[randomIndex].ability.name;
}
