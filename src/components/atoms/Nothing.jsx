import ZeroResult from '@/assets/icons/zeroResult.svg?react';

export default function Nothing({ children }) {
  return (
    <div className='w-full font-dotted font-bold text-center pt-30 pb-30'>
      <ZeroResult
        width={80}
        height={80}
        alt='No results'
        className='mx-auto mb-4'
        color='var(--text)'
      />
      {children}
    </div>
  );
}
