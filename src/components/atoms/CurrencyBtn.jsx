import { useCurrency } from '@/hooks';

export default function CurrencyBtn() {
  const { currency, setCurrency } = useCurrency();

  return (
    <button
      onClick={() => setCurrency(currency === 'usd' ? 'krw' : 'usd')}
      className='w-7.5 h-7.5 flex items-center justify-center border border-border rounded-full text-base font-bold text-text hover:text-accent hover:border-accent transition-colors duration-300 ease-in-out cursor-pointer'
    >
      {currency === 'usd' ? '₩' : '$'}
    </button>
  );
}
