import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ExportButton } from '@/components/ui/ExportButton';
import type { Pokemon } from '@/types/pokemon';

const pokemon: Pokemon = {
  name: 'Pikachu',
  type: ['Electric'],
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

describe(ExportButton, () => {
  const writeText = vi.fn<(text: string) => Promise<void>>();
  const execCommand = vi.fn<(command: string) => boolean>();

  beforeEach(() => {
    writeText.mockResolvedValue();
    execCommand.mockReturnValue(true);

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    Object.defineProperty(window, 'isSecureContext', {
      configurable: true,
      value: true,
    });
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommand,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    writeText.mockReset();
    execCommand.mockReset();
  });

  it('opens and closes the export dialog', async () => {
    render(<ExportButton pokemon={[pokemon]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Export Team' }));

    expect(screen.getByRole('dialog', { name: 'Export Team' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'Export Team' })).not.toBeInTheDocument();
    });
  });

  it('copies the exported team with the Clipboard API', async () => {
    render(<ExportButton pokemon={[pokemon]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Export Team' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(expect.stringContaining('Pikachu @ Light Ball'));
    });
    expect(execCommand).not.toHaveBeenCalled();
  });

  it('falls back to document copy when the Clipboard API fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    writeText.mockRejectedValue(new Error('Clipboard unavailable'));
    render(<ExportButton pokemon={[pokemon]} />);

    fireEvent.click(screen.getByRole('button', { name: 'Export Team' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copy to clipboard' }));

    await waitFor(() => {
      expect(execCommand).toHaveBeenCalledWith('copy');
    });
    expect(consoleError).toHaveBeenCalledWith('Failed to copy text:', expect.any(Error));
  });
});
