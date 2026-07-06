import { useQuery } from '@tanstack/react-query';
import { getSearchCard } from '@/api/getSearchCard';

export function useSearchData({ q, ids, limit, offset }) {
  return useQuery({
    queryKey: ['searchData', q, ids, limit, offset],
    queryFn: () => getSearchCard(q, limit, offset, ids),
  });
}
