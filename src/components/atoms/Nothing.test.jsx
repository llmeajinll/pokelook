import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Nothing from './Nothing';

describe('Nothing', () => {
  it('renders the given children as its message', () => {
    render(<Nothing>NO RESULT</Nothing>);
    expect(screen.getByText('NO RESULT')).toBeInTheDocument();
  });

  it('renders the empty-state icon', () => {
    const { container } = render(<Nothing>NO RESULT</Nothing>);
    expect(container.querySelector('svg[alt="No results"]')).not.toBeNull();
  });
});
