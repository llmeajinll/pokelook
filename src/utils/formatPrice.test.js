import { describe, expect, it } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
  it('formats a number as USD by default', () => {
    expect(formatPrice(12.5, 'usd')).toBe('$12.50');
  });

  it('converts to KRW using the fixed exchange rate', () => {
    expect(formatPrice(10, 'krw')).toBe('₩15,360');
  });

  it('returns a dash for non-number values', () => {
    expect(formatPrice(undefined, 'usd')).toBe('-');
    expect(formatPrice(null, 'usd')).toBe('-');
  });
});
