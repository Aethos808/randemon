import { describe, expect, it } from 'vitest';

import type { Pokemon, PokemonMoves } from '@/types/pokemon';

import { formatTeamExport } from './teamExport';

function createMoves(names: [string, string, string, string]): PokemonMoves {
  return [
    { name: names[0], type: 'Normal' },
    { name: names[1], type: 'Normal' },
    { name: names[2], type: 'Normal' },
    { name: names[3], type: 'Normal' },
  ];
}

function createPokemon(
  name: string,
  item: string,
  ability: string,
  moveNames: [string, string, string, string],
): Pokemon {
  return {
    name,
    type: ['Normal'],
    ability,
    moves: createMoves(moveNames),
    pokemonImage: '/pokemon.png',
    itemImage: '/item.png',
    item,
  };
}

describe('formatTeamExport', () => {
  it('formats a complete six-member team for Pokémon Showdown', () => {
    const team = [
      createPokemon('Great Tusk', 'Booster Energy', 'Protosynthesis', [
        'Headlong Rush',
        'Close Combat',
        'Rapid Spin',
        'Knock Off',
      ]),
      createPokemon('Gholdengo', 'Choice Scarf', 'Good As Gold', [
        'Make It Rain',
        'Shadow Ball',
        'Focus Blast',
        'Trick',
      ]),
      createPokemon('Dragonite', 'Heavy-Duty Boots', 'Multiscale', [
        'Dragon Dance',
        'Extreme Speed',
        'Earthquake',
        'Ice Spinner',
      ]),
      createPokemon('Kingambit', 'Black Glasses', 'Supreme Overlord', [
        'Kowtow Cleave',
        'Sucker Punch',
        'Iron Head',
        'Swords Dance',
      ]),
      createPokemon('Iron Valiant', 'Choice Specs', 'Quark Drive', [
        'Moonblast',
        'Aura Sphere',
        'Thunderbolt',
        'Psyshock',
      ]),
      createPokemon('Rotom-Wash', 'Leftovers', 'Levitate', ['Hydro Pump', 'Volt Switch', 'Will-O-Wisp', 'Protect']),
    ];

    expect(formatTeamExport(team)).toBe(`Great Tusk @ Booster Energy
Ability: Protosynthesis
EVs: 1 HP
Bashful Nature
- Headlong Rush
- Close Combat
- Rapid Spin
- Knock Off

Gholdengo @ Choice Scarf
Ability: Good As Gold
EVs: 1 HP
Bashful Nature
- Make It Rain
- Shadow Ball
- Focus Blast
- Trick

Dragonite @ Heavy-Duty Boots
Ability: Multiscale
EVs: 1 HP
Bashful Nature
- Dragon Dance
- Extreme Speed
- Earthquake
- Ice Spinner

Kingambit @ Black Glasses
Ability: Supreme Overlord
EVs: 1 HP
Bashful Nature
- Kowtow Cleave
- Sucker Punch
- Iron Head
- Swords Dance

Iron Valiant @ Choice Specs
Ability: Quark Drive
EVs: 1 HP
Bashful Nature
- Moonblast
- Aura Sphere
- Thunderbolt
- Psyshock

Rotom-Wash @ Leftovers
Ability: Levitate
EVs: 1 HP
Bashful Nature
- Hydro Pump
- Volt Switch
- Will-O-Wisp
- Protect`);
  });
});
