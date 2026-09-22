export type PokemonType =
  | 'Normal'
  | 'Fire'
  | 'Water'
  | 'Electric'
  | 'Grass'
  | 'Ice'
  | 'Fighting'
  | 'Poison'
  | 'Ground'
  | 'Flying'
  | 'Psychic'
  | 'Bug'
  | 'Rock'
  | 'Ghost'
  | 'Dragon'
  | 'Dark'
  | 'Steel'
  | 'Fairy';

export type MoveWithType = {
  name: string;
  type: string;
};

export type PokemonMoves = [MoveWithType, MoveWithType, MoveWithType, MoveWithType];
export type PokemonTypes = [PokemonType] | [PokemonType, PokemonType];

export type Pokemon = {
  name: string;
  type: PokemonTypes;
  ability: string;
  moves: PokemonMoves;
  pokemonImage: string;
  itemImage: string;
  item: string;
};

const POKEMON_TYPES_BY_NAME: Readonly<Record<string, PokemonType>> = {
  normal: 'Normal',
  fire: 'Fire',
  water: 'Water',
  electric: 'Electric',
  grass: 'Grass',
  ice: 'Ice',
  fighting: 'Fighting',
  poison: 'Poison',
  ground: 'Ground',
  flying: 'Flying',
  psychic: 'Psychic',
  bug: 'Bug',
  rock: 'Rock',
  ghost: 'Ghost',
  dragon: 'Dragon',
  dark: 'Dark',
  steel: 'Steel',
  fairy: 'Fairy',
};

export function createPokemonMoves(moves: MoveWithType[]): PokemonMoves {
  if (moves.length !== 4) {
    throw new Error(`Expected exactly four moves, received ${moves.length}`);
  }

  return [moves[0], moves[1], moves[2], moves[3]];
}

export function createPokemonTypes(types: string[]): PokemonTypes {
  if (types.length < 1 || types.length > 2) {
    throw new Error(`Expected one or two Pokémon types, received ${types.length}`);
  }

  const parsedTypes = types.map((type) => {
    const parsedType = POKEMON_TYPES_BY_NAME[type.toLowerCase()];

    if (!parsedType) {
      throw new Error(`Unknown Pokémon type: ${type}`);
    }

    return parsedType;
  });

  return parsedTypes.length === 1 ? [parsedTypes[0]] : [parsedTypes[0], parsedTypes[1]];
}
