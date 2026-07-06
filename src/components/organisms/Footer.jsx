import React from 'react';

export default function Footer() {
  return (
    <div className='border-t border-border py-8 px-6 max-[378px]:pt-6 max-[378px]:pb-20 max-[378px]:px-4 max-[378px]:text-center'>
      <h1 className='text-2xl font-bold max-[378px]:text-base '>POKELOOK</h1>
      <div className='pt-6 max-[378px]:text-xs max-[378px]:pt-2'>
        박사님도 몰랐던 카드 시세
      </div>
      <div className='max-[378px]:text-xs'>
        The smartest way to check card prices
      </div>
      <div className='pt-6 max-[378px]:text-xs max-[378px]:pt-2'>
        © {new Date().getFullYear()} PokeLook. Not affiliated with Nintendo or
        The Pokémon Company.
      </div>
    </div>
  );
}
