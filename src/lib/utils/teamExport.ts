import type { Pokemon } from '@/types/pokemon';

function formatPokemon(pokemon: Pokemon): string {
  return `${pokemon.name} @ ${pokemon.item}
Ability: ${pokemon.ability}
EVs: 1 HP
Bashful Nature
- ${pokemon.moves[0].name}
- ${pokemon.moves[1].name}
- ${pokemon.moves[2].name}
- ${pokemon.moves[3].name}`;
}

export function formatTeamExport(team: readonly Pokemon[]): string {
  return team.map(formatPokemon).join('\n\n');
}
