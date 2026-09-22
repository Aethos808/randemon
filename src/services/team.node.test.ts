import { describe, expect, it, vi } from 'vitest';

import type { ItemInfo } from '@/lib/utils/randomItem';
import type { PokemonMovesByName } from '@/lib/validation/pokemonMoves';

import type { PokeApiPokemon } from './pokemon';
import { generateRandomTeam } from './team';

const pokemonNames = ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'];

function createPokemon(name: string, ability = `${name}-ability`): PokeApiPokemon {
  return {
    name,
    types: [{ type: { name: 'normal' } }],
    abilities: [{ ability: { name: ability } }],
    sprites: {
      other: {
        showdown: { front_default: null },
        'official-artwork': { front_default: null },
      },
    },
  };
}

function createMoveData(names: string[]): PokemonMovesByName {
  return Object.fromEntries(
    names.map((name) => [
      name,
      {
        moves: Array.from({ length: 4 }, (_, index) => ({
          name: `${name}-move-${index + 1}`,
          type: 'normal',
        })),
      },
    ]),
  );
}

function createPokemonFetcher(pokemon: PokeApiPokemon[]) {
  let index = 0;

  return vi.fn(async () => {
    const nextPokemon = pokemon[index];
    index += 1;

    if (!nextPokemon) {
      throw new Error('Test Pokémon sequence exhausted');
    }

    return nextPokemon;
  });
}

function createItemFetcher(items: ItemInfo[]) {
  let index = 0;

  return vi.fn(async () => {
    const nextItem = items[index];
    index += 1;

    if (!nextItem) {
      throw new Error('Test item sequence exhausted');
    }

    return nextItem;
  });
}

describe('generateRandomTeam', () => {
  it('retries missing move records and creates a team with unique abilities and items', async () => {
    const validPokemon = pokemonNames.map((name) => createPokemon(name));
    const fetchPokemon = createPokemonFetcher([createPokemon('missing'), ...validPokemon]);
    const fetchItem = createItemFetcher(
      pokemonNames.map((name) => ({
        name: `${name}-item`,
        sprite: `https://example.com/${name}.png`,
      })),
    );

    const team = await generateRandomTeam({
      fetchItem,
      fetchPokemon,
      getPokemonSet: () => new Set(['missing', ...pokemonNames]),
      movesByPokemon: createMoveData(pokemonNames),
    });

    expect(team).toHaveLength(6);
    expect(fetchPokemon).toHaveBeenCalledTimes(7);
    expect(new Set(team.map((pokemon) => pokemon.ability)).size).toBe(6);
    expect(new Set(team.map((pokemon) => pokemon.item)).size).toBe(6);
    expect(team.every((pokemon) => pokemon.pokemonImage === '/missingno-fallback.png')).toBe(true);
  });

  it('stops retrying when no Pokémon has move data', async () => {
    const fetchPokemon = vi.fn(async () => createPokemon('missing'));

    await expect(
      generateRandomTeam({
        fetchPokemon,
        getPokemonSet: () => new Set(['missing']),
        maxPokemonAttempts: 2,
        movesByPokemon: {},
      }),
    ).rejects.toThrow('Unable to select a Pokémon with move data after 2 attempts');

    expect(fetchPokemon).toHaveBeenCalledTimes(2);
  });

  it('fails immediately when a Pokémon has no unused abilities', async () => {
    const fetchPokemon = createPokemonFetcher([createPokemon('alpha', 'static'), createPokemon('bravo', 'static')]);
    const fetchItem = createItemFetcher([{ name: 'leftovers', sprite: 'leftovers.png' }]);

    await expect(
      generateRandomTeam({
        fetchItem,
        fetchPokemon,
        getPokemonSet: () => new Set(['alpha', 'bravo']),
        movesByPokemon: createMoveData(['alpha', 'bravo']),
      }),
    ).rejects.toThrow('Unable to select a unique ability for bravo: all available abilities are already used');

    expect(fetchItem).toHaveBeenCalledTimes(1);
  });

  it('stops retrying when item uniqueness is exhausted', async () => {
    const fetchPokemon = createPokemonFetcher([createPokemon('alpha'), createPokemon('bravo')]);
    const fetchItem = vi.fn(async () => ({ name: 'leftovers', sprite: 'leftovers.png' }));

    await expect(
      generateRandomTeam({
        fetchItem,
        fetchPokemon,
        getPokemonSet: () => new Set(['alpha', 'bravo']),
        maxItemAttempts: 2,
        movesByPokemon: createMoveData(['alpha', 'bravo']),
      }),
    ).rejects.toThrow('Unable to select a unique item after 2 attempts');

    expect(fetchItem).toHaveBeenCalledTimes(3);
  });
});
