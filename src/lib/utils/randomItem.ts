// held-items.json is from PokeAPI item-category/12 (held items)
// Excluded items: pass-orb, smoke-ball, lax-incense, full-incense, wave-incense, odd-incense
import heldItems from '@/lib/held-items.json';

type PokeApiItemResponse = {
  name: string;
  sprites: {
    default: string;
  };
};

export type ItemInfo = {
  name: string;
  sprite: string;
};

export async function getRandomItem(): Promise<ItemInfo> {
  const randomIndex = Math.floor(Math.random() * heldItems.items.length);
  const selectedItem = heldItems.items[randomIndex];

  const itemResponse = await fetch(`${selectedItem.url}`);

  if (!itemResponse.ok) {
    throw new Error(`Failed to fetch item details for ${selectedItem.name}`);
  }

  const itemData: PokeApiItemResponse = await itemResponse.json();

  return {
    name: itemData.name,
    sprite: itemData.sprites.default,
  };
}
