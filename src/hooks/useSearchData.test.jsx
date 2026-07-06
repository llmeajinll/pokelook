import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSearchData } from './useSearchData';
import { getSearchCard } from '@/api/getSearchCard';

vi.mock('@/api/getSearchCard', () => ({
  getSearchCard: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe('useSearchData', () => {
  it('fetches search results using the query params', async () => {
    getSearchCard.mockResolvedValue({
      data: { data: [{ id: '1', name: 'Pikachu' }], total: 1 },
    });

    const { result } = renderHook(
      () => useSearchData({ q: 'pikachu', limit: 10, offset: 0 }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getSearchCard).toHaveBeenCalledWith('pikachu', 10, 0, undefined);
    expect(result.current.data.data.data[0].name).toBe('Pikachu');
  });
});
