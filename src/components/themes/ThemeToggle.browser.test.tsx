import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeToggle } from '@/components/themes/ThemeToggle';

const theme = vi.hoisted(() => ({
  resolvedTheme: 'light',
  setTheme: vi.fn(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => theme,
}));

describe(ThemeToggle, () => {
  beforeEach(() => {
    theme.resolvedTheme = 'light';
    theme.setTheme.mockReset();
  });

  it('has an accessible name and switches from light to dark mode', () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(screen.getByRole('img', { name: 'Light mode' })).toBeInTheDocument();
    expect(theme.setTheme).toHaveBeenCalledWith('dark');
  });

  it('switches from dark to light mode', () => {
    theme.resolvedTheme = 'dark';
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));

    expect(screen.getByRole('img', { name: 'Dark mode' })).toBeInTheDocument();
    expect(theme.setTheme).toHaveBeenCalledWith('light');
  });
});
