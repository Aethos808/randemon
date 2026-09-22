import { describe, expect, it, vi } from 'vitest';

import { getRandomItem } from './randomItem';

const createJsonResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
  });

describe('getRandomItem', () => {
  it('returns validated item data using the documented cache policy', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      createJsonResponse({
        name: 'bright-powder',
        sprites: { default: 'https://example.com/bright-powder.png' },
      }),
    );

    await expect(getRandomItem({ fetcher, random: () => 0 })).resolves.toEqual({
      name: 'bright-powder',
      sprite: 'https://example.com/bright-powder.png',
    });

    expect(fetcher).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/item/190/',
      expect.objectContaining({
        cache: 'force-cache',
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('rejects malformed item data with item context', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      createJsonResponse({
        name: 'bright-powder',
        sprites: { default: null },
      }),
    );

    await expect(getRandomItem({ fetcher, random: () => 0 })).rejects.toThrow(
      'Invalid PokeAPI item response for bright-powder: sprites.default must be a string',
    );
  });
});
