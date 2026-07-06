import { beforeEach, describe, expect, it } from 'vitest';
import { getCart, isInCart, toggleCartItem } from './cart';

const product = { id: 'card-1', name: 'Pikachu' };

describe('cart utils', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('starts empty', () => {
    expect(getCart()).toEqual([]);
    expect(isInCart(product.id)).toBe(false);
  });

  it('adds the full product on first toggle', () => {
    toggleCartItem(product);
    expect(getCart()).toEqual([product]);
    expect(isInCart(product.id)).toBe(true);
  });

  it('removes the product on the second toggle', () => {
    toggleCartItem(product);
    toggleCartItem(product);
    expect(getCart()).toEqual([]);
    expect(isInCart(product.id)).toBe(false);
  });
});
