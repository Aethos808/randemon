import { describe, expect, it } from 'vitest';

import { capitalizeWords } from './string';

describe('capitalizeWords', () => {
  it('formats hyphenated names as title-cased words', () => {
    expect(capitalizeWords('great-tusk')).toBe('Great Tusk');
  });

  it.each([
    ['ho-oh', 'Ho-oh'],
    ['PORYGON-Z', 'Porygon-z'],
    ['jangmo-o', 'Jangmo-o'],
  ])('preserves the meaningful hyphen in %s', (input, expected) => {
    expect(capitalizeWords(input)).toBe(expected);
  });

  it('returns an empty string for empty input', () => {
    expect(capitalizeWords('')).toBe('');
  });
});
