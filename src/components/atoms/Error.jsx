import ErrorIcon from '@/assets/icons/error.svg?react';

export default function Error({ error }) {
  return (
    <div className='w-full mx-auto flex flex-col justify-center items-center gap-2 py-10 min-[378px]:py-30'>
      <div className='glitch-wrap w-20 h-20'>
        <ErrorIcon
          color='var(--accent)'
          width={80}
          height={80}
          className='g-base'
        />
        <ErrorIcon width={80} height={80} className='g-r' aria-hidden='true' />
        <ErrorIcon width={80} height={80} className='g-b' aria-hidden='true' />
      </div>
      <div className='glitch-wrap font-dotted font-bold'>
        <span className='g-base text-accent'>
          {error.response.status} ERROR
        </span>
        <span aria-hidden='true' className='g-r'>
          {error.response.status} ERROR
        </span>
        <span aria-hidden='true' className='g-b'>
          {error.response.status} ERROR
        </span>
      </div>
    </div>
  );
}
