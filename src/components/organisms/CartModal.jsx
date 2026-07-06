import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Nothing } from '@/components/atoms';
import { Product } from '@/components/molecules';
import Close from '@/assets/icons/close.svg?react';
import HeartFill from '@/assets/icons/heart_fill.svg?react';
import { getCart, toggleCartItem } from '@/utils/cart';
import { getKoreanName } from '@/utils/getKoreaName';
import { formatPrice } from '@/utils/formatPrice';
import { useCurrency } from '@/hooks';

export default function CartModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [, forceRefresh] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 582px)').matches,
  );
  const items = getCart();

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 582px)');
    const handleChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const handleRemove = (e, product) => {
    e.stopPropagation();
    toggleCartItem(product);
    forceRefresh((n) => n + 1);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-h-[80vh] bg-card-bg border border-border rounded-xl p-4 flex flex-col ${
          isDesktop ? 'max-w-3xl' : 'max-w-sm'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-3'>
          <h2 className='font-bold text-lg text-text'>좋아요 카드</h2>
          <Close
            width={22}
            height={22}
            onClick={onClose}
            className='cursor-pointer text-text'
          />
        </div>

        <div className='overflow-y-auto flex-1'>
          {items.length === 0 ? (
            <Nothing>NO RESULT</Nothing>
          ) : isDesktop ? (
            <div className='grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4'>
              {items.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {items.map((product) => (
                <div
                  key={product.id}
                  className='flex items-center gap-3 border-b border-border pb-3 cursor-pointer'
                  onClick={() => {
                    onClose();
                    navigate(`/detail/${product.id}`);
                  }}
                >
                  <img
                    src={product.image_url}
                    alt={product.id}
                    className='w-14 h-14 object-contain border border-border rounded-md'
                  />
                  <div className='flex-1 min-w-0'>
                    <div className='text-xs text-text-sub truncate'>
                      {product.set?.name}
                    </div>
                    <div className='text-sm text-text truncate'>
                      {getKoreanName(product.name)}
                    </div>
                    <div className='text-sm font-semibold text-text'>
                      {formatPrice(
                        product.prices?.raw?.lightly_played?.tcgplayer
                          ?.market,
                        currency,
                      )}
                    </div>
                  </div>
                  <HeartFill
                    width={22}
                    height={22}
                    onClick={(e) => handleRemove(e, product)}
                    className='text-accent cursor-pointer flex-none'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
