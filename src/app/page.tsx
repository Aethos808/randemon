import { Header } from '@/components/ui/Header';
import { PokemonCard, type ItemSprite, type PokemonSprite, type Types } from '@/components/ui/PokemonCard';
import { RegenerateButton } from '@/components/ui/RegenerateButton';
import { getRandomAbility } from '@/lib/utils/randomAbility';
import { getRandomItem } from '@/lib/utils/randomItem';
import { getRandomMoves } from '@/lib/utils/randomMoves';
import { getRandomPokeApiPokemonId } from '@/lib/utils/randomPokemonId';
import { getPokemon } from '@/services/pokemon';
import { capitalizeWords } from '@/lib/utils/string';
import { VersionText } from '@/components/ui/VersionText';

const generateRandomPokemon = async (usedAbilities: Set<string>, usedItems: Set<string>) => {
  const pokeApiPokemonId = getRandomPokeApiPokemonId();
  const pokemonFromPokeApi = await getPokemon(pokeApiPokemonId);

  const pokemonImage =
    pokemonFromPokeApi.sprites.other.showdown.front_default ||
    pokemonFromPokeApi.sprites.other['official-artwork'].front_default;

  let ability;
  do {
    ability = capitalizeWords(getRandomAbility(pokemonFromPokeApi.abilities));
  } while (usedAbilities.has(ability));
  usedAbilities.add(ability);

  let itemInfo;
  do {
    itemInfo = await getRandomItem();
  } while (usedItems.has(itemInfo.name));
  usedItems.add(itemInfo.name);

  return {
    name: capitalizeWords(pokemonFromPokeApi.name),
    type: pokemonFromPokeApi.types.map((t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)) as Types,
    ability: capitalizeWords(getRandomAbility(pokemonFromPokeApi.abilities)),
    moves: await getRandomMoves(pokemonFromPokeApi.moves),
    pokemonImage: pokemonImage as PokemonSprite,
    itemImage: itemInfo.sprite as ItemSprite,
    item: capitalizeWords(itemInfo.name),
  };
};

export default async function Home() {
  const usedAbilities = new Set<string>();
  const usedItems = new Set<string>();

  const pokemonPromises = Array.from({ length: 6 }, () => generateRandomPokemon(usedAbilities, usedItems));
  const randomPokemon = await Promise.all(pokemonPromises);

  return (
    <main className="flex flex-col gap-y-4 row-start-2 items-center sm:items-start">
      <VersionText />
      <Header />
      <RegenerateButton />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {randomPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </section>
    </main>
  );
}
