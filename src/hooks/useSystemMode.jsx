import { useContext } from 'react';
import { SystemModeContext } from './SystemModeContext';

export function useSystemMode() {
  return useContext(SystemModeContext);
}
