import { Header } from '@/components/ui/Header';
import { PokemonCard, type ItemSprite, type PokemonSprite, type Types } from '@/components/ui/PokemonCard';
import { RegenerateButton } from '@/components/ui/RegenerateButton';
import { getRandomAbility } from '@/lib/utils/randomAbility';
import { getRandomItem } from '@/lib/utils/randomItem';
import { getRandomMoves, type AllPokemonMovesGen9ByPokemon } from '@/lib/utils/randomMoves';
import { getGen9Pokemon } from '@/lib/utils/getGen9Pokemon';
import { getPokemon } from '@/services/pokemon';
import { capitalizeWords } from '@/lib/utils/string';
import { VersionText } from '@/components/ui/VersionText';
import { ExportButton } from '@/components/ui/ExportButton';
import * as allPokemonMoves from '@/lib/pokemon-moves.json';

const generateRandomPokemon = async (
  usedAbilities: Set<string>,
  usedItems: Set<string>,
  gen9PokemonSet: Set<string>,
  allGen9MovesPerPokemon: AllPokemonMovesGen9ByPokemon,
) => {
  const pokemonFromPokeApi = await getPokemon(gen9PokemonSet);

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
    moves: getRandomMoves(pokemonFromPokeApi.name, allGen9MovesPerPokemon),
    pokemonImage: pokemonImage as PokemonSprite,
    itemImage: itemInfo.sprite as ItemSprite,
    item: capitalizeWords(itemInfo.name),
  };
};

export default async function Home() {
  const usedAbilities = new Set<string>();
  const usedItems = new Set<string>();
  const gen9PokemonSet = getGen9Pokemon();
  const allGen9MovesPerPokemon: AllPokemonMovesGen9ByPokemon =
    allPokemonMoves as unknown as AllPokemonMovesGen9ByPokemon;

  const pokemonPromises = Array.from({ length: 6 }, () =>
    generateRandomPokemon(usedAbilities, usedItems, gen9PokemonSet, allGen9MovesPerPokemon),
  );
  const randomPokemon = await Promise.all(pokemonPromises);

  return (
    <main className="flex flex-col gap-y-4 row-start-2 items-center sm:items-start">
      <VersionText />
      <Header />
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <RegenerateButton />
        <ExportButton pokemon={randomPokemon} />
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {randomPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} {...pokemon} />
        ))}
      </section>
    </main>
  );
}
