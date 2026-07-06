import { beforeEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { SystemModeProvider } from './SystemModeProvider';
import { useSystemMode } from './useSystemMode';

function wrapper({ children }) {
  return <SystemModeProvider>{children}</SystemModeProvider>;
}

describe('useSystemMode', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggles the mode and persists it to localStorage', () => {
    const { result } = renderHook(() => useSystemMode(), { wrapper });

    act(() => {
      result.current.setMode('dark');
    });

    expect(result.current.mode).toBe('dark');
    expect(localStorage.getItem('mode')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('reads a previously stored mode on mount', () => {
    localStorage.setItem('mode', 'dark');

    const { result } = renderHook(() => useSystemMode(), { wrapper });

    expect(result.current.mode).toBe('dark');
  });
});
