import type { Types, PokemonCardProps } from '@/components/ui/PokemonCard';
import { getRandomAbility } from '@/lib/utils/randomAbility';
import { getRandomItem } from '@/lib/utils/randomItem';
import { getRandomMoves, type AllPokemonMovesGen9ByPokemon } from '@/lib/utils/randomMoves';
import { getGen9Pokemon } from '@/lib/utils/getGen9Pokemon';
import { getPokemon } from '@/services/pokemon';
import { capitalizeWords } from '@/lib/utils/string';
import * as allPokemonMoves from '@/lib/pokemon-moves.json';

const TEAM_SIZE = 6;
const FALLBACK_POKEMON_IMAGE = '/missingno-fallback.png';

const generateRandomPokemon = async (
  usedAbilities: Set<string>,
  usedItems: Set<string>,
  gen9PokemonSet: Set<string>,
  allGen9MovesPerPokemon: AllPokemonMovesGen9ByPokemon,
): Promise<PokemonCardProps> => {
  const pokemonFromPokeApi = await getPokemon(gen9PokemonSet);

  const pokemonImage =
    pokemonFromPokeApi.sprites.other.showdown.front_default ||
    pokemonFromPokeApi.sprites.other['official-artwork'].front_default ||
    FALLBACK_POKEMON_IMAGE;

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
    ability,
    moves: getRandomMoves(pokemonFromPokeApi.name, allGen9MovesPerPokemon),
    pokemonImage,
    itemImage: itemInfo.sprite,
    item: capitalizeWords(itemInfo.name),
  };
};

export async function generateRandomTeam(): Promise<PokemonCardProps[]> {
  const usedAbilities = new Set<string>();
  const usedItems = new Set<string>();
  const gen9PokemonSet = getGen9Pokemon();
  const allGen9MovesPerPokemon = allPokemonMoves as unknown as AllPokemonMovesGen9ByPokemon;

  const team: PokemonCardProps[] = [];
  for (let i = 0; i < TEAM_SIZE; i++) {
    team.push(await generateRandomPokemon(usedAbilities, usedItems, gen9PokemonSet, allGen9MovesPerPokemon));
  }

  return team;
}
