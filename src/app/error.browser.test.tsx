import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Error from './error';

describe(Error, () => {
  it('retries rendering the route when requested', () => {
    const reset = vi.fn();
    render(<Error reset={reset} />);

    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(reset).toHaveBeenCalledOnce();
  });
});
