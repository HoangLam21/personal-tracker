'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-indigo-600 text-white hover:bg-indigo-500',
        outline: 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100',
        ghost: 'bg-gray-50 text-gray-500 hover:bg-gray-100',
      },
      size: {
        lg: 'h-12 px-6 text-base',
        md: 'h-10 px-5 text-sm',
        sm: 'h-8 px-4 text-sm',
      },
      icon: {
        on: 'gap-2',
        off: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      icon: 'off',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconOnly?: boolean;
}

export const Button = ({
  className,
  variant,
  size,
  iconOnly,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, icon: iconOnly ? 'on' : 'off' }), className)}
      {...props}
    />
  );
};
