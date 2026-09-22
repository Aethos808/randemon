import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PokemonCard } from '@/components/ui/PokemonCard';
import type { Pokemon, PokemonTypes } from '@/types/pokemon';

function createPokemon(type: PokemonTypes): Pokemon {
  return {
    name: 'Pikachu',
    type,
    ability: 'Static',
    moves: [
      { name: 'Thunderbolt', type: 'Electric' },
      { name: 'Quick Attack', type: 'Normal' },
      { name: 'Iron Tail', type: 'Steel' },
      { name: 'Play Rough', type: 'Fairy' },
    ],
    pokemonImage: '/pikachu.png',
    itemImage: '/light-ball.png',
    item: 'Light Ball',
  };
}

describe(PokemonCard, () => {
  it('renders a Pokémon with one type', () => {
    render(<PokemonCard {...createPokemon(['Electric'])} />);

    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeInTheDocument();
    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Static')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thunderbolt' })).toBeInTheDocument();
  });

  it('renders both types for a dual-type Pokémon', () => {
    render(<PokemonCard {...createPokemon(['Electric', 'Steel'])} />);

    expect(screen.getByText('Electric')).toBeInTheDocument();
    expect(screen.getByText('Steel')).toBeInTheDocument();
  });
});
