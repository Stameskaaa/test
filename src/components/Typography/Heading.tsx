import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
  size?: 'h5' | 'h3';
  nowrap?: boolean;
  alignment?: 'center' | 'left' | 'right';
  color?: 'black' | 'white' | 'basic' | 'gray' | 'brand' | 'cyan';
}

const headingVariants = cva('', {
  variants: {
    size: {
      h5: 'font-medium text-xl leading-7',
      h3: 'font-medium text-[24px] leading-[32px]',
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
    size: 'h5',
    alignment: 'center',
    color: 'basic',
  },
});

export const Heading: React.FC<HeadingProps> = ({
  size,
  nowrap,
  alignment,
  color,
  className,
  children,
  ...props
}) => {
  return (
    <h1 className={cn(headingVariants({ size, nowrap, alignment, color }), className)} {...props}>
      {children}
    </h1>
  );
};
