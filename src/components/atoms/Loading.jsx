import { useEffect, useState } from 'react';
import Battery0 from '@/assets/icons/battery0.svg?react';
import Battery1 from '@/assets/icons/battery1.svg?react';
import Battery2 from '@/assets/icons/battery2.svg?react';
import Battery3 from '@/assets/icons/battery3.svg?react';

const batteryIcons = [Battery0, Battery1, Battery2, Battery3];

export default function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % batteryIcons.length);
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const BatteryIcon = batteryIcons[index];

  return (
    <div className='w-full mx-auto flex flex-col justify-center items-center gap-2 py-10 min-[378px]:py-30'>
      <div style={{ height: '124px' }}>
        <BatteryIcon color='var(--text-sub)' width={80} height={80} />
        <div className='w-fit text-sub font-dotted'>LOADING</div>
      </div>
    </div>
  );
}
