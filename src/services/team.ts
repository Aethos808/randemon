import allPokemonMovesJson from '@/lib/pokemon-moves.json';
import { getGen9Pokemon } from '@/lib/utils/getGen9Pokemon';
import { getRandomAbility } from '@/lib/utils/randomAbility';
import { getRandomItem } from '@/lib/utils/randomItem';
import { getRandomMoves } from '@/lib/utils/randomMoves';
import { capitalizeWords } from '@/lib/utils/string';
import { parsePokemonMoves, type PokemonMovesByName } from '@/lib/validation/pokemonMoves';
import { getPokemon, type PokeApiPokemon } from '@/services/pokemon';
import { createPokemonTypes, type Pokemon } from '@/types/pokemon';

const TEAM_SIZE = 6;
const FALLBACK_POKEMON_IMAGE = '/missingno-fallback.png';
const DEFAULT_MAX_POKEMON_ATTEMPTS = 10;
const DEFAULT_MAX_ITEM_ATTEMPTS = 10;
const allGen9MovesPerPokemon = parsePokemonMoves(allPokemonMovesJson);

type GenerateTeamOptions = {
  fetchItem?: typeof getRandomItem;
  fetchPokemon?: typeof getPokemon;
  getPokemonSet?: typeof getGen9Pokemon;
  maxItemAttempts?: number;
  maxPokemonAttempts?: number;
  movesByPokemon?: PokemonMovesByName;
  selectAbility?: typeof getRandomAbility;
  selectMoves?: typeof getRandomMoves;
};

type GeneratePokemonOptions = {
  fetchItem: typeof getRandomItem;
  fetchPokemon: typeof getPokemon;
  gen9PokemonSet: Set<string>;
  maxItemAttempts: number;
  maxPokemonAttempts: number;
  movesByPokemon: PokemonMovesByName;
  selectAbility: typeof getRandomAbility;
  selectMoves: typeof getRandomMoves;
};

function validateAttemptLimit(name: string, attempts: number): void {
  if (!Number.isInteger(attempts) || attempts < 1) {
    throw new Error(`${name} must be a positive integer; received ${attempts}`);
  }
}

async function selectPokemonWithMoves({
  fetchPokemon,
  gen9PokemonSet,
  maxPokemonAttempts,
  movesByPokemon,
}: GeneratePokemonOptions): Promise<PokeApiPokemon> {
  for (let attempt = 1; attempt <= maxPokemonAttempts; attempt += 1) {
    const pokemon = await fetchPokemon(gen9PokemonSet);

    if (movesByPokemon[pokemon.name]) {
      return pokemon;
    }
  }

  throw new Error(`Unable to select a Pokémon with move data after ${maxPokemonAttempts} attempts`);
}

function selectUniqueAbility(
  pokemon: PokeApiPokemon,
  usedAbilities: Set<string>,
  selectAbility: typeof getRandomAbility,
): string {
  const unusedAbilities = pokemon.abilities.filter((entry) => !usedAbilities.has(capitalizeWords(entry.ability.name)));

  if (unusedAbilities.length === 0) {
    throw new Error(`Unable to select a unique ability for ${pokemon.name}: all available abilities are already used`);
  }

  const ability = capitalizeWords(selectAbility(unusedAbilities));
  usedAbilities.add(ability);

  return ability;
}

async function selectUniqueItem(usedItems: Set<string>, fetchItem: typeof getRandomItem, maxItemAttempts: number) {
  for (let attempt = 1; attempt <= maxItemAttempts; attempt += 1) {
    const item = await fetchItem();

    if (!usedItems.has(item.name)) {
      usedItems.add(item.name);
      return item;
    }
  }

  throw new Error(`Unable to select a unique item after ${maxItemAttempts} attempts`);
}

const generateRandomPokemon = async (
  usedAbilities: Set<string>,
  usedItems: Set<string>,
  options: GeneratePokemonOptions,
): Promise<Pokemon> => {
  const pokemonFromPokeApi = await selectPokemonWithMoves(options);

  const pokemonImage =
    pokemonFromPokeApi.sprites.other.showdown.front_default ||
    pokemonFromPokeApi.sprites.other['official-artwork'].front_default ||
    FALLBACK_POKEMON_IMAGE;

  const ability = selectUniqueAbility(pokemonFromPokeApi, usedAbilities, options.selectAbility);
  const itemInfo = await selectUniqueItem(usedItems, options.fetchItem, options.maxItemAttempts);

  return {
    name: capitalizeWords(pokemonFromPokeApi.name),
    type: createPokemonTypes(pokemonFromPokeApi.types.map((entry) => entry.type.name)),
    ability,
    moves: options.selectMoves(pokemonFromPokeApi.name, options.movesByPokemon),
    pokemonImage,
    itemImage: itemInfo.sprite,
    item: capitalizeWords(itemInfo.name),
  };
};

export async function generateRandomTeam(options: GenerateTeamOptions = {}): Promise<Pokemon[]> {
  const {
    fetchItem = getRandomItem,
    fetchPokemon = getPokemon,
    getPokemonSet = getGen9Pokemon,
    maxItemAttempts = DEFAULT_MAX_ITEM_ATTEMPTS,
    maxPokemonAttempts = DEFAULT_MAX_POKEMON_ATTEMPTS,
    movesByPokemon = allGen9MovesPerPokemon,
    selectAbility = getRandomAbility,
    selectMoves = getRandomMoves,
  } = options;

  validateAttemptLimit('maxItemAttempts', maxItemAttempts);
  validateAttemptLimit('maxPokemonAttempts', maxPokemonAttempts);

  const usedAbilities = new Set<string>();
  const usedItems = new Set<string>();
  const team: Pokemon[] = [];

  const generatePokemonOptions: GeneratePokemonOptions = {
    fetchItem,
    fetchPokemon,
    gen9PokemonSet: getPokemonSet(),
    maxItemAttempts,
    maxPokemonAttempts,
    movesByPokemon,
    selectAbility,
    selectMoves,
  };

  for (let i = 0; i < TEAM_SIZE; i++) {
    team.push(await generateRandomPokemon(usedAbilities, usedItems, generatePokemonOptions));
  }

  return team;
}
