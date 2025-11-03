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

import { cva, type VariantProps } from 'class-variance-authority';
import {
    type ComponentProps,
    type ElementType,
    type ReactNode,
    type SyntheticEvent,
    useMemo,
    useState,
} from 'react';
import { useEventCallback } from 'usehooks-ts';
import { cn } from '../../../../apps/frontend/src/lib';
import type { DistributiveOmit, Overwrite } from './types';

const defaultRootElement = 'img' as const;

const pictureVariants = cva('', {
  variants: {
    variant: {
      responsive: 'w-full h-auto object-contain',
      fixed: 'w-auto h-auto object-none',
      cover: 'w-full h-full object-cover',
      contain: 'w-full h-full object-contain',
      thumbnail: 'w-24 h-24 rounded-lg object-cover',
      avatar: 'w-12 h-12 rounded-full object-cover',
      hero: 'w-full h-[60vh] object-cover',
      card: 'w-full h-48 rounded-lg object-cover',
    },
    isLoading: {
      true: 'animate-pulse bg-muted',
      false: '',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
    transition: {
      none: '',
      hover: 'transition-transform duration-200 hover:scale-105',
      zoom: 'transition-all duration-300 hover:scale-110',
      fade: 'transition-opacity duration-200 hover:opacity-80',
    },
  },
  defaultVariants: {
    variant: 'responsive',
    isLoading: false,
    rounded: 'none',
    shadow: 'none',
    transition: 'none',
  },
});

namespace Picture {
  export interface BaseRootElementProps {
    className?: undefined | string;
    onLoad?: undefined | React.ReactEventHandler<HTMLImageElement>;
    onError?: undefined | React.ReactEventHandler<HTMLImageElement>;
  }

  export type BaseRootElementType = ElementType<BaseRootElementProps>;

  export interface OwnProps extends Omit<VariantProps<typeof pictureVariants>, 'isLoading'> {
    /**
     * Image source URL
     */
    src?: string;

    /**
     * Alternative text for accessibility
     */
    alt?: string;

    /**
     * Loading strategy
     */
    loading?: 'lazy' | 'eager';

    /**
     * Responsive image sizes
     */
    sizes?: string;

    /**
     * Source set for responsive images
     */
    srcSet?: string;

    /**
     * Override the default root element.
     */
    component?: BaseRootElementType;

    source?: {
      srcSet?: string;
      sizes?: string;
      media?: string;
    };

    picture?: {
      className?: string;
    };
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

export const PictureInternal: Picture.Type = ({
  component: Component = defaultRootElement,
  variant,
  src,
  alt = '',
  loading = 'lazy',
  sizes,
  srcSet,
  source,
  picture,
  rounded,
  shadow,
  transition,
  className,
  onLoad,
  onError,
  ...rest
}: Overwrite<Picture.BaseRootElementProps, Picture.OwnProps>) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = useEventCallback((e: SyntheticEvent<HTMLImageElement>) => {
    onLoad?.(e);
    if (e.defaultPrevented) return;
    setIsLoading(false);
  });

  const handleError = useEventCallback((e: SyntheticEvent<HTMLImageElement>) => {
    onError?.(e);
    if (e.defaultPrevented) return;
    setIsLoading(false);
    console.warn('Image failed to load:', src);
  });

  const defaultProps = useMemo<Partial<Picture.BaseRootElementProps>>(
    () => ({
      onLoad: handleLoad,
      onError: handleError,
      loading,
      alt,
    }),
    [loading, alt, handleLoad, handleError],
  );

  const imgClassName = useMemo<Picture.BaseRootElementProps['className']>(
    () =>
      pictureVariants({
        variant,
        isLoading,
        rounded,
        shadow,
        transition,
        className,
      }),
    [className, variant, isLoading, rounded, shadow, transition],
  );

  const imgProps = {
    ...defaultProps,
    ...rest,
    src,
    srcSet,
    sizes,
    className: imgClassName,
    'aria-busy': isLoading,
    'aria-label': alt,
  };

  return (
    <picture className={cn('block', picture?.className)}>
      {source && <source srcSet={source.srcSet} sizes={source.sizes} media={source.media} />}
      <Component {...imgProps} />
    </picture>
  );
};

export const Picture = PictureInternal;
