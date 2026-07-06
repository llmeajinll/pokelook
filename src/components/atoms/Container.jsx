import React from 'react';
import { cva } from 'class-variance-authority';

const container = cva('div', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col',
    },
    flexbox: {
      left_center: 'justify-start items-center',
      left_end: 'justify-start items-end',
      center_end: 'justify-center items-end',
      center_center: 'justify-center items-center',
      space_center: 'justify-between items-center',
      space_end: 'justify-between items-end',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
    size: {
      full: 'w-full h-full',
      fit: 'w-fit h-fit',
    },
  },
  defaultVariants: {
    direction: 'col',
    size: 'full',
  },
});

export default function Container({
  children,
  className,
  direction,
  flexbox,
  size,
  gap,
  style,
}) {
  return (
    <div
      className={`flex box-border ${container({ direction, flexbox, size, gap })} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
