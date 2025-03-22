const SPECIAL_POKEMON_NAMES = [
  'ho-oh',
  'porygon-z',
  'jangmo-o',
  'hakamo-o',
  'kommo-o',
  'wo-chien',
  'chien-po',
  'ting-lu',
  'chi-yu',
  'soul-heart',
];

export function capitalizeWords(text: string): string {
  if (SPECIAL_POKEMON_NAMES.includes(text.toLowerCase())) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return text
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
