import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SystemColorBtn } from '@/components/molecules';
import { Input, CurrencyBtn } from '@/components/atoms';
import CartModal from './CartModal';
import Search from '@/assets/icons/search.svg?react';
import Cart from '@/assets/icons/cart.svg?react';

export default function NavBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 582px)');
    const handleChange = (e) => {
      if (e.matches) setIsSearchOpen(false);
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 z-40 flex items-start justify-center pt-16 px-6 min-[582px]:hidden transition-opacity duration-300 ${
          isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSearchOpen(false)}
      >
        <form
          className={`w-full max-w-sm transition-transform duration-300 ease-out ${
            isSearchOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            e.preventDefault();
            navigate(
              `/search?query=${search}&limit=${searchParams.get('limit') || 20}&offset=0`,
            );
            setIsSearchOpen(false);
          }}
        >
          <Input
            ref={inputRef}
            placeholder='포켓몬 검색'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
            className='py-3 px-3'
          />
        </form>
      </div>

      <div className='fixed flex gap-4 py-2 px-4 bottom-4.5 left-1/2 transform -translate-x-1/2 bg-bg-sub/95 rounded-full border border-border min-[582px]:hidden'>
        <SystemColorBtn />
        <Search
          width={30}
          height={30}
          color='var(--text)'
          className='cursor-pointer'
          onClick={() => setIsSearchOpen((prev) => !prev)}
        />
        <Cart
          width={30}
          height={30}
          color='var(--text)'
          className='cursor-pointer'
          onClick={() => setIsCartOpen(true)}
        />
        <CurrencyBtn />
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
