import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { RegenerateButton } from '@/components/ui/RegenerateButton';

const { refresh } = vi.hoisted(() => ({
  refresh: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ refresh }),
}));

describe(RegenerateButton, () => {
  beforeEach(() => {
    refresh.mockReset();
  });

  it('refreshes the route to generate another team', () => {
    render(<RegenerateButton />);

    fireEvent.click(screen.getByRole('button', { name: 'Randomize Team' }));

    expect(refresh).toHaveBeenCalledOnce();
  });
});
