import allPokemonMovesJson from '@/lib/pokemon-moves.json';
import { getGen9Pokemon } from '@/lib/utils/getGen9Pokemon';
import { getRandomAbility } from '@/lib/utils/randomAbility';
import { getRandomItem } from '@/lib/utils/randomItem';
import { getRandomMoves } from '@/lib/utils/randomMoves';
import { capitalizeWords } from '@/lib/utils/string';
import { parsePokemonMoves, type PokemonMovesByName } from '@/lib/validation/pokemonMoves';
import { getPokemon } from '@/services/pokemon';
import { createPokemonTypes, type Pokemon } from '@/types/pokemon';

const TEAM_SIZE = 6;
const FALLBACK_POKEMON_IMAGE = '/missingno-fallback.png';
const allGen9MovesPerPokemon = parsePokemonMoves(allPokemonMovesJson);

const generateRandomPokemon = async (
  usedAbilities: Set<string>,
  usedItems: Set<string>,
  gen9PokemonSet: Set<string>,
  allMovesByPokemon: PokemonMovesByName,
): Promise<Pokemon> => {
  let pokemonFromPokeApi = await getPokemon(gen9PokemonSet);

  // Retry if Pokemon has no move data (name mismatch between PokeAPI and move JSON)
  while (!allMovesByPokemon[pokemonFromPokeApi.name]) {
    console.error(
      `[Randemon] No move data found for Pokemon: ${pokemonFromPokeApi.name}. Retrying with another Pokemon.`,
    );
    pokemonFromPokeApi = await getPokemon(gen9PokemonSet);
  }

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
    type: createPokemonTypes(pokemonFromPokeApi.types.map((entry) => entry.type.name)),
    ability,
    moves: getRandomMoves(pokemonFromPokeApi.name, allMovesByPokemon),
    pokemonImage,
    itemImage: itemInfo.sprite,
    item: capitalizeWords(itemInfo.name),
  };
};

export async function generateRandomTeam(): Promise<Pokemon[]> {
  const usedAbilities = new Set<string>();
  const usedItems = new Set<string>();
  const gen9PokemonSet = getGen9Pokemon();
  const team: Pokemon[] = [];
  for (let i = 0; i < TEAM_SIZE; i++) {
    team.push(await generateRandomPokemon(usedAbilities, usedItems, gen9PokemonSet, allGen9MovesPerPokemon));
  }

  return team;
}
