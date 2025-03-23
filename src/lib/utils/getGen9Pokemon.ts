import blueberryEntries from '@/lib/blueberryEntries.json';
import kitikamiEntries from '@/lib/kitikamiEntries.json';
import paldeaEntries from '@/lib/paldeaEntries.json';

export const getGen9Pokemon = (): Set<string> => {
  const allEntries = [
    ...blueberryEntries.pokemon_entries,
    ...kitikamiEntries.pokemon_entries,
    ...paldeaEntries.pokemon_entries,
  ];

  const pokemonNames = new Set<string>();

  allEntries.forEach((entry) => {
    pokemonNames.add(entry.pokemon_species.name);
  });

  return pokemonNames;
};
