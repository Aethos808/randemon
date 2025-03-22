import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Title } from '@/components/layout/title/Title';

describe(Title, () => {
  it('should render the title', () => {
    const testTitle = 'Test Title';
    render(<Title title={testTitle} />);

    const title = screen.getByText(testTitle);

    expect(title).toBeInTheDocument();
  });

  it('should be rendered the title with the custom class', () => {
    const testTitle = 'Test Title';
    const customClass = 'text-red-500';
    render(<Title title={testTitle} className={customClass} />);

    const title = screen.getByRole('heading', { name: testTitle });

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(customClass);
  });
});
