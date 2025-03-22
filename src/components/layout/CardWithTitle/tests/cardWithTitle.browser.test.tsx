import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CardWithTitle } from '@/components/CardWithTitle/CardWithTitle';

describe(CardWithTitle, () => {
  it('should render the card with title', () => {
    const testTitle = 'Test Title';
    const testContent = 'Test Content';

    render(
      <CardWithTitle title={testTitle}>
        <p>{testContent}</p>
      </CardWithTitle>,
    );

    const title = screen.getByRole('heading', { name: testTitle });
    const content = screen.getByText(testContent);

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
