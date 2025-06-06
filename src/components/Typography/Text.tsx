import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode; // Библиотека вынуждает
  size?: 'xs' | 'sm' | 'base';
  weight?: 'regular' | 'medium';
  nowrap?: boolean;
  alignment?: 'center' | 'left' | 'right';
  color?: 'black' | 'white' | 'basic' | 'gray' | 'brand' | 'cyan';
}

const textVariants = cva('', {
  variants: {
    size: {
      xs: 'text-[12px] leading-4',
      sm: 'text-sm leading-5',
      base: 'text-base leading-6',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
    },
    nowrap: {
      true: 'whitespace-nowrap text-ellipsis overflow-hidden',
    },
    alignment: {
      center: 'text-center',
      left: 'text-left',
      right: 'text-right',
    },
    color: {
      black: 'text-[var(--color-black)]',
      white: 'text-[var(--color-white)]',
      basic: 'text-[var(--color-basic)]',
      gray: 'text-[var(--color-gray)]',
      brand: 'text-[var(--color-brand)]',
      cyan: 'text-[var(--color-cyan)]',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'regular',
    alignment: 'center',
    color: 'basic',
  },
});

export const Text: React.FC<TextProps> = ({
  size,
  weight,
  nowrap,
  alignment,
  color,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(textVariants({ size, weight, nowrap, alignment, color }), className)}
      {...props}>
      {children}
    </span>
  );
};
