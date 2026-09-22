import { describe, expect, it } from 'vitest';

import { getRandomValue, RandomSourceError } from './random';

describe('getRandomValue', () => {
  it('returns values within the random source contract', () => {
    expect(getRandomValue(() => 0.5)).toBe(0.5);
  });

  it.each([-0.1, 1, Number.NaN, Number.POSITIVE_INFINITY])('rejects an invalid value: %s', (value) => {
    expect.assertions(4);

    try {
      getRandomValue(() => value, 'selecting a test value');
    } catch (error) {
      expect(error).toBeInstanceOf(RandomSourceError);
      expect(error).toMatchObject({
        value,
        operation: 'selecting a test value',
      });
      expect(error).toHaveProperty('name', 'RandomSourceError');
      expect(error).toHaveProperty(
        'message',
        `Random source must return a value from 0 up to, but not including, 1; received ${value} while selecting a test value`,
      );
    }
  });
});
