import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartEmpty from '@/assets/icons/heart_empty.svg?react';
import HeartFill from '@/assets/icons/heart_fill.svg?react';
import { getKoreanName } from '@/utils/getKoreaName';
import { isInCart, toggleCartItem } from '@/utils/cart';
import { formatPrice } from '@/utils/formatPrice';
import { useCurrency } from '@/hooks';

export default function Product({ product }) {
  const [defaultImg] = useState(
    () =>
      `/no_img_${Math.floor(Math.random() * 11) + 1 > 2 ? 'default' : 'shinny'}.png`,
  );
  const navigate = useNavigate();
  const [inCart, setInCart] = useState(() => isInCart(product.id));
  const { currency } = useCurrency();
  const tcgplayer = product.prices.raw.lightly_played?.tcgplayer;

  const handleToggleCart = (e) => {
    e.stopPropagation();
    toggleCartItem(product);
    setInCart((prev) => !prev);
  };

  return (
    <div>
      <div className='relative'>
        <img
          src={product.image_url}
          alt={product.id}
          className='w-full border border-border rounded-xl cursor-pointer'
          onClick={() => {
            navigate(`/detail/${product.id}`);
          }}
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
        />
        {inCart ? (
          <HeartFill
            width={30}
            height={30}
            onClick={handleToggleCart}
            className='absolute bottom-4 right-4 text-accent cursor-pointer'
          />
        ) : (
          <HeartEmpty
            width={30}
            height={30}
            onClick={handleToggleCart}
            className='absolute bottom-4 right-4 text-border cursor-pointer'
          />
        )}
      </div>
      <div className='py-2 px-1'>
        <div className='font-bold text-xs pb-1 text-text-sub'>
          {product.set.name}
        </div>
        <div className='text-[15px] h-6'>{getKoreanName(product.name)}</div>
        {/* [{product.rarity}] */}
        <div className='flex justify-between items-end mt-2.5'>
          <div className='text-lg font-semibold'>
            {formatPrice(tcgplayer?.market, currency)}
          </div>
          <div className='text-text-sub text-xs'>
            <div>
              <span style={{ display: 'inline-block', width: '30px' }}>
                low
              </span>
              {formatPrice(tcgplayer?.low, currency)}
            </div>
            <div>
              <span style={{ display: 'inline-block', width: '30px' }}>
                high
              </span>
              {formatPrice(tcgplayer?.high, currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
