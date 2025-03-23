type PokeApiItemFromCategory = {
  name: string;
  url: string;
};

type PokeApiItemCategoryResponse = {
  items: Array<PokeApiItemFromCategory>;
};

type PokeApiItemResponse = {
  sprites: {
    default: string;
  };
};

export type ItemInfo = {
  name: string;
  sprite: string;
};

export async function getRandomItem(): Promise<ItemInfo> {
  const response = await fetch('https://pokeapi.co/api/v2/item-category/12');
  if (!response.ok) {
    throw new Error('Failed to fetch held items');
  }
  const data: PokeApiItemCategoryResponse = await response.json();
  const ignoredItems = new Set([
    'pass-orb',
    'smoke-ball',
    'lax-incense',
    'full-incense',
    'wave-incense',
    'odd-incense',
  ]);
  let selectedItem: PokeApiItemFromCategory;

  do {
    const randomIndex = Math.floor(Math.random() * data.items.length);
    selectedItem = data.items[randomIndex];
  } while (ignoredItems.has(selectedItem.name));

  const itemResponse = await fetch(`https://pokeapi.co/api/v2/item/${selectedItem.name}`);
  if (!itemResponse.ok) {
    throw new Error(`Failed to fetch item details for ${selectedItem.name}`);
  }
  const itemData: PokeApiItemResponse = await itemResponse.json();

  return {
    name: selectedItem.name,
    sprite: itemData.sprites.default,
  };
}
