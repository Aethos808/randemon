export type RandomSource = () => number;

export class RandomSourceError extends RangeError {
  constructor(
    public readonly value: number,
    public readonly operation?: string,
  ) {
    const context = operation ? ` while ${operation}` : '';

    super(`Random source must return a value from 0 up to, but not including, 1; received ${value}${context}`);
    this.name = 'RandomSourceError';
  }
}

export function getRandomValue(random: RandomSource, operation?: string): number {
  const value = random();

  if (!Number.isFinite(value) || value < 0 || value >= 1) {
    throw new RandomSourceError(value, operation);
  }

  return value;
}
