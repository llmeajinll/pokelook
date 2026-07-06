import { useQuery } from '@tanstack/react-query';
import { getCardDetail } from '@/api/getCardDetail';

export function useCardDetail(id) {
  return useQuery({
    queryKey: ['cardDetail', id],
    queryFn: () => getCardDetail(id),
    enabled: !!id,
  });
}
