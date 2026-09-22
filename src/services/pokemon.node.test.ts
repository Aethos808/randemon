import { describe, expect, it, vi } from 'vitest';

import { getPokemon } from './pokemon';

const validPokemonResponse = {
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
  abilities: [{ ability: { name: 'static' } }],
  sprites: {
    other: {
      showdown: { front_default: 'https://example.com/pikachu.gif' },
      'official-artwork': { front_default: 'https://example.com/pikachu.png' },
    },
  },
};

const createJsonResponse = (body: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
    ...init,
  });

describe('getPokemon', () => {
  it('returns validated Pokémon data and disables request caching', async () => {
    const fetcher = vi.fn<typeof fetch>(async () => createJsonResponse(validPokemonResponse));

    await expect(
      getPokemon(new Set(['pikachu']), {
        fetcher,
        getPokemonId: () => 25,
      }),
    ).resolves.toEqual(validPokemonResponse);

    expect(fetcher).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/25',
      expect.objectContaining({
        cache: 'no-store',
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('reports endpoint context and HTTP status', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      createJsonResponse({}, { status: 503, statusText: 'Service Unavailable' }),
    );

    await expect(
      getPokemon(new Set(['pikachu']), {
        fetcher,
        getPokemonId: () => 25,
      }),
    ).rejects.toThrow(
      'PokeAPI request failed for Pokémon 25 with status 503 Service Unavailable: https://pokeapi.co/api/v2/pokemon/25',
    );
  });

  it('rejects malformed response data', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      createJsonResponse({
        ...validPokemonResponse,
        types: [],
      }),
    );

    await expect(
      getPokemon(new Set(['pikachu']), {
        fetcher,
        getPokemonId: () => 25,
      }),
    ).rejects.toThrow('Invalid PokeAPI Pokémon response: types must contain one or two entries');
  });

  it('fails with endpoint context when a request times out', async () => {
    const fetcher: typeof fetch = async (_input, init) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(init.signal?.reason));
      });

    await expect(
      getPokemon(new Set(['pikachu']), {
        fetcher,
        getPokemonId: () => 25,
        timeoutMs: 1,
      }),
    ).rejects.toThrow('PokeAPI request timed out for Pokémon 25: https://pokeapi.co/api/v2/pokemon/25');
  });
});
