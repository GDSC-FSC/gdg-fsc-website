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
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, type ElementType, type ReactNode, useMemo } from 'react';
import type { DistributiveOmit, Overwrite } from './types';

const defaultRootElement = 'p' as const;

const textVariants = cva('', {
  variants: {
    variant: {
      heading: 'font-bold tracking-tight',
      body: 'leading-relaxed',
      caption: 'text-sm text-muted-foreground',
      small: 'text-xs',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      accent: 'text-accent-foreground',
      foreground: 'text-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'body',
    size: 'md',
    color: 'foreground',
  },
});

type TextVariants = VariantProps<typeof textVariants>;

namespace Text {
  export interface BaseRootElementProps {
    className?: string;
    children?: ReactNode;
  }

  export type BaseRootElementType = ElementType<BaseRootElementProps>;

  export interface OwnProps extends TextVariants {
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

export const TextInternal = <
  TRootElement extends Text.BaseRootElementType = typeof defaultRootElement,
>({
  component: Component = defaultRootElement,
  className,
  variant,
  size,
  weight,
  color,
  ...props
}: Text.Props<TRootElement>) => {
  const defaultProps = useMemo<Partial<Text.BaseRootElementProps>>(
    () => ({
      // Calculate default props here.
    }),
    [],
  );

  const textClassName = textVariants({ variant, size, weight, color });

  return <Component {...defaultProps} {...props} className={cn(textClassName, className)} />;
};

export const Text = TextInternal as Text.Type;
