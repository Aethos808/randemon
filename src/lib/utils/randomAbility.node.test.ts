import { describe, expect, it, vi } from 'vitest';

import { getRandomAbility } from './randomAbility';

const abilities = [{ ability: { name: 'overgrow' } }, { ability: { name: 'protean' } }];

describe('getRandomAbility', () => {
  it('uses the supplied random source to select an ability', () => {
    expect(getRandomAbility(abilities, () => 0)).toBe('overgrow');
    expect(getRandomAbility(abilities, () => 0.99)).toBe('protean');
  });

  it('rejects an empty ability list before using randomness', () => {
    const random = vi.fn(() => 0);

    expect(() => getRandomAbility([], random)).toThrow('Cannot select an ability from an empty list');
    expect(random).not.toHaveBeenCalled();
  });

  it.each([-0.1, 1, Number.NaN])('rejects an invalid random value: %s', (randomValue) => {
    expect(() => getRandomAbility(abilities, () => randomValue)).toThrow(
      'Random source must return a value from 0 up to, but not including, 1',
    );
  });
});
