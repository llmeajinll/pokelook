const USD_TO_KRW = 1536;

export function formatPrice(amount, currency) {
  if (typeof amount !== 'number') return '-';
  if (currency === 'krw') {
    return `₩${Math.round(amount * USD_TO_KRW).toLocaleString('ko-KR')}`;
  }
  return `$${amount.toFixed(2)}`;
}
