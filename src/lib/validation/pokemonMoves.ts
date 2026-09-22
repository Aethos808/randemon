export type PokemonMoveData = {
  name: string;
  type: string;
};

export type PokemonMoveRecord = {
  moves: PokemonMoveData[];
};

export type PokemonMovesByName = Record<string, PokemonMoveRecord>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseMove(value: unknown, pokemonName: string, index: number): PokemonMoveData {
  if (!isRecord(value) || typeof value.name !== 'string' || typeof value.type !== 'string') {
    throw new Error(`Invalid move data for ${pokemonName} at index ${index}`);
  }

  return {
    name: value.name,
    type: value.type,
  };
}

export function parsePokemonMoves(value: unknown): PokemonMovesByName {
  if (!isRecord(value)) {
    throw new Error('Pokémon move data must be an object keyed by Pokémon name');
  }

  const parsedMoves: PokemonMovesByName = {};

  for (const [pokemonName, record] of Object.entries(value)) {
    if (!isRecord(record) || !Array.isArray(record.moves)) {
      throw new Error(`Invalid move record for ${pokemonName}`);
    }

    parsedMoves[pokemonName] = {
      moves: record.moves.map((move, index) => parseMove(move, pokemonName, index)),
    };
  }

  return parsedMoves;
}
