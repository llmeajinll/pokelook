const CART_KEY = 'cart';

export function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function isInCart(id) {
  return getCart().some((item) => item.id === id);
}

export function toggleCartItem(product) {
  const cart = getCart();
  const next = cart.some((item) => item.id === product.id)
    ? cart.filter((item) => item.id !== product.id)
    : [...cart, product];
  sessionStorage.setItem(CART_KEY, JSON.stringify(next));
  return next;
}
