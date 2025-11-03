// @ts-check

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

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import type { ComponentProps, ElementType, MouseEvent, ReactNode } from 'react';
import { useMemo } from 'react';
import { useEventCallback } from 'usehooks-ts';
import type { DistributiveOmit, Overwrite } from './types';

const defaultRootElement = 'button' as const;

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

namespace Button {
  export interface BaseRootElementProps {
    className?: undefined | string;
    onClick?: undefined | React.MouseEventHandler<HTMLButtonElement>;
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

export const ButtonInternal: Button.Type = ({
  component: Component = defaultRootElement,
  variant,
  size,
  className,
  ...props
}: Overwrite<Button.BaseRootElementProps, Button.OwnProps>) => {
  const defaultProps = useMemo<Partial<Button.BaseRootElementProps>>(
    () => ({
      // Calculate default props here.
    }),
    [],
  );

  const onClick = useEventCallback((e: MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(e);
    if (e.defaultPrevented) return;
    // ...Custom logic here.
  });

  return (
    <Component
      {...defaultProps}
      {...props}
      className={clsx(buttonVariants({ variant, size, className }), className)}
      onClick={onClick}
    />
  );
};

export const Button = ButtonInternal;
