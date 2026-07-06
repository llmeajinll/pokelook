import { forwardRef } from 'react';
import Close from '@/assets/icons/close.svg?react';

const Input = forwardRef(function Input(
  { value, onChange, onClear, className = '', ...props },
  ref,
) {
  return (
    <div
      className={`flex items-center gap-1 border border-border rounded-md p-2 text-sm bg-card-bg text-text cursor-pointer ${className}`}
    >
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        className='flex-1 min-w-0 bg-transparent outline-none text-base text-text max-[582px]:text-sm'
        {...props}
      />

      <Close
        width={20}
        height={20}
        onClick={onClear}
        className='cursor-pointer text-text flex-none'
      />
    </div>
  );
});

export default Input;
