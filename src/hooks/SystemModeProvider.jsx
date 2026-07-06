import { useEffect, useState } from 'react';
import { SystemModeContext } from './SystemModeContext';

function getInitialMode() {
  const stored = localStorage.getItem('mode');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function SystemModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('mode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <SystemModeContext.Provider value={{ mode, setMode }}>
      {children}
    </SystemModeContext.Provider>
  );
}
