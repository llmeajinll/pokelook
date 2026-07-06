import { Button } from '@/components/atoms';
import Sun from '@/assets/icons/sun.svg?react';
import Moon from '@/assets/icons/moon.svg?react';
import { useSystemMode } from '@/hooks';

export default function SystemColorBtn() {
  const { mode, setMode } = useSystemMode();
  return (
    <Button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
      {mode === 'light' ? (
        <Moon
          width={30}
          height={30}
          className='text-text hover:text-accent transition-colors duration-300 ease-in-out cursor-pointer'
        />
      ) : (
        <Sun
          width={30}
          height={30}
          className='text-text hover:text-accent transition-colors duration-300 ease-in-out cursor-pointer'
        />
      )}
    </Button>
  );
}
