import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SystemColorBtn } from '@/components/molecules';
import { Input, CurrencyBtn } from '@/components/atoms';
import CartModal from './CartModal';
import { getEnglishName } from '@/utils/getEnglishName';
import Search from '@/assets/icons/search.svg?react';
import Cart from '@/assets/icons/cart.svg?react';

export default function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 582px)');
    const handleChange = (e) => {
      if (e.matches) setIsSearchOpen(false);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className='box-border w-full h-fit py-3 px-5 flex justify-between items-center border-b border-border'>
      <div
        className='glitch-wrap glitch-hover font-bold font-press text-sm cursor-pointer min-[582px]:text-xl'
        onClick={() => navigate('/')}
      >
        <span className='g-base'>POKELOOK</span>
        <span className='g-r' aria-hidden='true'>
          POKELOOK
        </span>
        <span className='g-b' aria-hidden='true'>
          POKELOOK
        </span>
      </div>

      <div
        className={`w-fit box-border flex justify-between items-center gap-3 max-[582px]:hidden`}
      >
        <div className='overflow-hidden h-11 flex items-center'>
          <form
            className={`transition-transform duration-300 ease-in-out ml-2 ${isSearchOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
            onSubmit={(e) => {
              e.preventDefault();
              console.log(getEnglishName(search));
              navigate(
                `/search?query=${search}&limit=${searchParams.get('limit') || 20}&offset=0`,
              );
            }}
          >
            <Input
              placeholder='포켓몬 검색'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch('')}
              tabIndex={isSearchOpen ? 0 : -1}
            />
          </form>
        </div>

        <Search
          width={30}
          height={30}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className='text-text hover:text-accent transition-colors duration-300 ease-in-out cursor-pointer'
        />
        <Cart
          width={30}
          height={30}
          onClick={() => setIsCartOpen(true)}
          className='text-text hover:text-accent transition-colors duration-300 ease-in-out cursor-pointer'
        />
        <SystemColorBtn />
        <CurrencyBtn />
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
