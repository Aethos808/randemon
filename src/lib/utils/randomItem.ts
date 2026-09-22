// held-items.json is from PokeAPI item-category/12 (held items)
// Excluded items: pass-orb, smoke-ball, lax-incense, full-incense, wave-incense, odd-incense
import heldItems from '@/lib/held-items.json';
import { fetchPokeApiJson, type PokeApiRequestOptions } from '@/services/pokeApi';

export type ItemInfo = {
  name: string;
  sprite: string | null;
};

type GetRandomItemOptions = PokeApiRequestOptions & {
  random?: () => number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseItemResponse(value: unknown, itemName: string): ItemInfo {
  if (!isRecord(value) || typeof value.name !== 'string' || value.name.length === 0) {
    throw new Error(`Invalid PokeAPI item response for ${itemName}: name must be a non-empty string`);
  }

  if (!isRecord(value.sprites) || (typeof value.sprites.default !== 'string' && value.sprites.default !== null)) {
    throw new Error(`Invalid PokeAPI item response for ${itemName}: sprites.default must be a string or null`);
  }

  return {
    name: value.name,
    sprite: value.sprites.default,
  };
}

export async function getRandomItem(options: GetRandomItemOptions = {}): Promise<ItemInfo> {
  const { random = Math.random, ...requestOptions } = options;
  const randomValue = random();

  if (randomValue < 0 || randomValue >= 1) {
    throw new Error(`Random source must return a value from 0 up to, but not including, 1; received ${randomValue}`);
  }

  const randomIndex = Math.floor(randomValue * heldItems.items.length);
  const selectedItem = heldItems.items[randomIndex];

  // Item details are immutable enough to share across generated teams.
  const itemData = await fetchPokeApiJson(selectedItem.url, {
    ...requestOptions,
    cache: 'force-cache',
    context: `item ${selectedItem.name}`,
  });

  return parseItemResponse(itemData, selectedItem.name);
}
