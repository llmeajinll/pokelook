import { useSearchParams } from 'react-router-dom';
import Right from '@/assets/icons/arrow_right.svg?react';
import Left from '@/assets/icons/arrow_left.svg?react';

export default function Pagination({ total, limit, offset }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
    const next = new URLSearchParams(searchParams);
    next.set('offset', String((page - 1) * limit));
    setSearchParams(next);
  };

  return (
    <div className='flex items-center gap-2 justify-center mt-8'>
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className='w-9 h-9 flex items-center justify-center rounded-md border-2 border-border text-text-mid cursor-pointer transition-colors duration-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-mid'
      >
        <Left width={18} height={18} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          disabled={page === currentPage}
          onClick={() => goToPage(page)}
          className={`w-9 h-9 rounded-md border-2 text-xs font-press text-center cursor-pointer transition-colors duration-200 ${
            page === currentPage
              ? 'bg-accent border-accent text-white cursor-default'
              : 'border-border text-text-mid hover:border-accent hover:text-accent'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className='w-9 h-9 flex items-center justify-center rounded-md border-2 border-border text-text-mid cursor-pointer transition-colors duration-200 hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-mid'
      >
        <Right width={18} height={18} />
      </button>
    </div>
  );
}
