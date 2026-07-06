import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyProvider } from '@/hooks';
import CurrencyBtn from './CurrencyBtn';

describe('CurrencyBtn', () => {
  it('toggles the currency when clicked', () => {
    render(
      <CurrencyProvider>
        <CurrencyBtn />
      </CurrencyProvider>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('₩');

    fireEvent.click(button);
    expect(button).toHaveTextContent('$');

    fireEvent.click(button);
    expect(button).toHaveTextContent('₩');
  });
});
