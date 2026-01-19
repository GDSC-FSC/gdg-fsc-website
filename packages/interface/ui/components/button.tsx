/**
 * Copyright 2025 GDG on Campus Farmingdale State College
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { cn } from '@gdg-fsc/utils';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ElementType, MouseEvent, ReactNode } from 'react';
import { useEventCallback } from 'usehooks-ts';
import type { DistributiveOmit, Overwrite } from './types';

const defaultRootElement = 'button' as const;

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

namespace Button {
  export interface BaseRootElementProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }

  export type BaseRootElementType = ElementType<BaseRootElementProps>;

  export interface OwnProps extends VariantProps<typeof buttonVariants> {
    /**
     * Override the default root element.
     */
    component?: BaseRootElementType;
  }
  export type Props<TRootElement extends BaseRootElementType = typeof defaultRootElement> =
    Overwrite<ComponentProps<TRootElement>, OwnProps>;
  export interface Type {
    <TRootElement extends BaseRootElementType = typeof defaultRootElement>(
      props: Overwrite<Props<TRootElement>, { component: TRootElement }>,
    ): ReactNode;
    (props: DistributiveOmit<Props, 'component'>): ReactNode;
  }
}

export const ButtonInternal = <
  TRootElement extends Button.BaseRootElementType = typeof defaultRootElement,
>({
  component: Component = defaultRootElement,
  variant,
  size,
  className,
  ...props
}: Button.Props<TRootElement>) => {
  const onClick = useEventCallback((e: MouseEvent<HTMLButtonElement>) => {
    (props as any).onClick?.(e);
    if (e.defaultPrevented) return;
  });

  return (
    <Component
      {...props}
      className={cn(buttonVariants({ variant, size, className }), className)}
      onClick={onClick}
    />
  );
};

export const Button = ButtonInternal as Button.Type;
