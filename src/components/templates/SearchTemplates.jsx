import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchData } from '@/hooks/useSearchData';
import { Loading, Error, Nothing } from '@/components/atoms';
import { Product } from '@/components/molecules';
import { Pagination } from '@/components/organisms';
import { getEnglishName } from '../../utils/getEnglishName';
import ArrowUp from '@/assets/icons/arrow_up.svg?react';
import ArrowDown from '@/assets/icons/arrow_down.svg?react';

export default function SearchTemplates() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const limit = Number(searchParams.get('limit')) || 20;
  const offset = Number(searchParams.get('offset')) || 0;

  const handleLimitChange = (e) => {
    const next = new URLSearchParams(searchParams);
    next.set('limit', e.target.value);
    next.set('offset', '0');
    setSearchParams(next);
  };

  const { data, isLoading, isError, error } = useSearchData({
    q: getEnglishName(searchParams.get('query')) || null,
    limit,
    offset,
  });

  const { data: cardData, total } = data?.data || { data: [], total: 0 };

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error} />;
  if (!cardData || cardData.length === 0) return <Nothing>NO RESULT</Nothing>;

  //   const total = 0;
  //   const cardData = [];

  return (
    <div className='w-full'>
      <div className='box-border px-5 py-8 w-full'>
        <h1 className='text-4xl font-medium mb-10 max-[582px]:text-2xl max-[582px]:mb-6'>
          "{searchParams.get('query')}" 검색 결과
        </h1>
        <div className='flex mb-4 justify-between items-baseline'>
          <div className='font-dotted text-xs font-bold '>TOTAL : {total}</div>
          <div className='relative'>
            <select
              value={limit}
              onChange={handleLimitChange}
              onFocus={() => setIsSelectOpen(true)}
              onBlur={() => setIsSelectOpen(false)}
              className='appearance-none border border-border rounded-md pl-2 pr-7 py-2 text-sm bg-card-bg text-text cursor-pointer'
            >
              {[20, 30, 40, 50].map((n) => (
                <option
                  key={n}
                  value={n}
                  className='bg-card-bg text-text'
                >
                  {n}개씩 보기
                </option>
              ))}
            </select>
            {isSelectOpen ? (
              <ArrowUp
                width={12}
                height={12}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-text-mid pointer-events-none'
              />
            ) : (
              <ArrowDown
                width={12}
                height={12}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-text-mid pointer-events-none'
              />
            )}
          </div>
        </div>

        <div className='w-full box-border min-w-50 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
          {cardData.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        <Pagination total={total} limit={limit} offset={offset} />
      </div>
    </div>
  );
}
