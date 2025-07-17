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

'use client';

import { FetchHttpClient } from '@effect/platform';
import type { QueryKey } from '@tanstack/react-query';
import {
  type UseSuspenseQueryOptions,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Effect, pipe } from 'effect';
import React, { Suspense, useCallback, useMemo } from 'react';
import {
  FetcherError,
  type FetcherOptions,
  fetcher,
  get,
  type QueryParams,
} from '../utils/fetcher.ts';
import { ClientError } from './client-error.tsx';
import { Loader } from './loader.tsx';

/**
 * @module effect-data-loader
 *
 * Enhanced DataLoader for React using React Query and Effect-TS.
 *
 * This module provides a generic, type-safe React component and hook for loading data asynchronously
 * with advanced error handling, caching, and developer experience. It is designed to work with Effect-TS
 * and React Query, supporting features like retries, timeouts, optimistic updates, and more.
 *
 * ## Features
 * - Type-safe data loading for React components
 * - Suspense support
 * - Customizable error and loading components
 * - Query caching and invalidation
 * - Optimistic updates
 * - Retry and timeout logic
 * - Render props and hook API
 *
 * @see DataLoader
 * @see useDataLoader
 *
 * @example
 * ```tsx
 * import { DataLoader } from './effect-data-loader';
 *
 * function UserList() {
 *   return (
 *     <DataLoader url="/api/users">
 *       {(users) => (
 *         <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
 *       )}
 *     </DataLoader>
 *   );
 * }
 * ```
 */

/**
 * Enhanced render props with additional query state and actions.
 *
 * @template T The type of the loaded data.
 * @property refetch Manually trigger a refetch.
 * @property isRefetching Whether the query is currently refetching.
 * @property queryClient Query client for advanced operations.
 * @property invalidate Invalidate this query's cache.
 * @property setQueryData Set query data optimistically.
 */
export interface DataLoaderRenderProps<T> {
  /** Manually trigger a refetch */
  refetch: () => Promise<void>;
  /** Whether the query is currently refetching */
  isRefetching: boolean;
  /** Query client for advanced operations */
  queryClient: ReturnType<typeof useQueryClient>;
  /** Invalidate this query's cache */
  invalidate: () => Promise<void>;
  /** Set query data optimistically */
  setQueryData: (data: T | ((prev: T) => T)) => void;
}

/**
 * Props for the DataLoader component.
 *
 * @template T The type of the loaded data.
 * @property children Render prop that receives data and optional utilities.
 * @property url URL to fetch data from.
 * @property queryOptions Additional React Query options.
 * @property LoadingComponent Custom loading component.
 * @property ErrorComponent Custom error component.
 * @property options Fetcher options (retries, timeout, etc.).
 * @property params Query parameters.
 * @property queryKey Custom query key override.
 * @property onSuccess Callback fired when data is successfully loaded.
 * @property onError Callback fired when an error occurs.
 * @property transform Transform the data before passing to children.
 * @property staleTime Stale time in milliseconds (default: 5 minutes).
 * @property refetchInterval Refetch interval in milliseconds (default: 5 minutes).
 * @property refetchOnWindowFocus Whether to refetch on window focus (default: false).
 * @property refetchOnReconnect Whether to refetch on reconnect (default: true).
 * @property [key: string] Additional props.
 */
export interface DataLoaderProps<T> {
  /**
   * Render prop that receives data and optional utilities.
   *
   * @param data The loaded data.
   * @param utils Optional render props for advanced query control.
   * @returns React node to render.
   */
  children:
    | ((data: T) => React.ReactNode)
    | ((data: T, utils: DataLoaderRenderProps<T>) => React.ReactNode);

  /** URL to fetch data from */
  url: string;

  /** Additional React Query options */
  queryOptions?: Partial<UseSuspenseQueryOptions<T, Error, T, QueryKey>>;

  /** Custom loading component */
  LoadingComponent?: React.ReactNode;

  /** Custom error component */
  ErrorComponent?: React.ComponentType<{ error: Error; retry: () => void }> | React.ReactElement;

  /** Fetcher options (retries, timeout, etc.) */
  options?: FetcherOptions;

  /** Query parameters */
  params?: QueryParams;

  /** Custom query key override */
  queryKey?: QueryKey;

  /** Callback fired when data is successfully loaded */
  onSuccess?: (data: T) => void;

  /** Callback fired when an error occurs */
  onError?: (error: Error) => void;

  /** Transform the data before passing to children */
  transform?: (data: any) => T;

  /** Stale time in milliseconds (default: 5 minutes) */
  staleTime?: number;

  /** Refetch interval in milliseconds (default: 5 minutes) */
  refetchInterval?: number;

  /** Whether to refetch on window focus (default: false) */
  refetchOnWindowFocus?: boolean;

  /** Whether to refetch on reconnect (default: true) */
  refetchOnReconnect?: boolean;

  /** Additional props */
  [key: string]: unknown;
}

/**
 * Enhanced DataLoader component with better error handling, caching, and developer experience.
 *
 * @template T The type of the loaded data.
 * @param props DataLoaderProps<T>
 * @returns {React.ReactElement} The rendered component.
 *
 * @example
 * ```tsx
 * <DataLoader url="/api/items">
 *   {(items) => <ItemList items={items} />}
 * </DataLoader>
 * ```
 */
export function DataLoader<T = unknown>({
  children,
  url,
  queryOptions = {},
  LoadingComponent = <Loader />,
  ErrorComponent = ClientError,
  options = {},
  params = {},
  queryKey,
  onSuccess,
  onError,
  transform,
  staleTime = 1000 * 60 * 5, // 5 minutes
  refetchInterval = 1000 * 60 * 5, // 5 minutes
  refetchOnWindowFocus = false,
  refetchOnReconnect = true,
  ...props
}: DataLoaderProps<T>): React.ReactElement {
  const queryClient = useQueryClient();

  // Generate stable query key
  const finalQueryKey = useMemo(() => {
    if (queryKey) return queryKey;
    const headers = (options as FetcherOptions)?.headers;
    const timeout = (options as FetcherOptions)?.timeout;
    return ['dataloader', url, params, headers, timeout] as const;
  }, [queryKey, url, params, options]);

  // Enhanced fetcher options with better defaults
  const fetcherOptions = useMemo(
    (): FetcherOptions => ({
      retries: 3,
      retryDelay: 1000,
      timeout: 30000,
      onError: (err: unknown) => {
        const path = parseCodePath(url, fetcher);
        console.error(`[DataLoader]: ${path}`);

        if (err instanceof FetcherError) {
          console.error(`[DataLoader]: Status ${err.status}`, err.responseData);
        } else {
          console.error('[DataLoader]: Unexpected error', err);
        }

        // Call user-provided error handler
        if (onError && err instanceof Error) {
          onError(err);
        }
      },
      ...options,
    }),
    [url, options, onError],
  );

  // Memoized query function
  const queryFn = useCallback(async (): Promise<T> => {
    try {
      const effect = pipe(
        get<T>(url, fetcherOptions, params),
        Effect.provide(FetchHttpClient.layer),
      );

      const result = await Effect.runPromise(effect);

      // Apply transformation if provided
      const finalResult = transform && typeof transform === 'function' ? transform(result) : result;

      // Call success callback
      if (onSuccess) {
        onSuccess(finalResult);
      }

      return finalResult;
    } catch (error) {
      // Enhanced error handling
      if (error instanceof FetcherError) {
        throw error;
      }

      // Wrap unexpected errors
      throw new FetcherError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        url,
        undefined,
        error,
      );
    }
  }, [url, fetcherOptions, params, transform, onSuccess]);

  // Enhanced query options
  const queryOptionsWithDefaults: UseSuspenseQueryOptions<T, Error, T, QueryKey> = useMemo(
    () => ({
      queryKey: finalQueryKey as unknown as readonly unknown[],
      queryFn,
      staleTime: staleTime as number,
      refetchInterval: refetchInterval as number,
      refetchOnWindowFocus: refetchOnWindowFocus as boolean,
      refetchOnReconnect: refetchOnReconnect as boolean,
      retry: (failureCount: number, error: unknown) => {
        if (
          error instanceof FetcherError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      ...(queryOptions || {}),
    }),
    [
      finalQueryKey,
      queryFn,
      staleTime,
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnReconnect,
      queryOptions,
    ],
  );

  const { data, error, refetch, isRefetching } = useSuspenseQuery<T, Error, T, QueryKey>(
    queryOptionsWithDefaults,
  );

  // Enhanced render props
  const renderProps: DataLoaderRenderProps<T> = useMemo(
    () => ({
      refetch: async () => {
        await refetch();
      },
      isRefetching,
      queryClient,
      invalidate: async () => {
        await queryClient.invalidateQueries({ queryKey: finalQueryKey });
      },
      setQueryData: (newData: T | ((prev: T) => T)) => {
        queryClient.setQueryData(finalQueryKey, newData);
      },
    }),
    [refetch, isRefetching, queryClient, finalQueryKey],
  );

  // Enhanced error component with retry capability
  const renderError = useCallback(
    (error: Error) => {
      if (React.isValidElement(ErrorComponent)) {
        return React.cloneElement(ErrorComponent as React.ReactElement<any>, {
          error,
          retry: () => refetch(),
        });
      }

      const Component = ErrorComponent as React.ComponentType<{ error: Error; retry: () => void }>;
      return <Component error={error} retry={() => refetch()} />;
    },
    [ErrorComponent, refetch],
  );

  // Determine how to call children function
  const renderChildren = useCallback(() => {
    if (typeof children === 'function') {
      // Check if it's a function that accepts 2 parameters (data + utils)
      try {
        const result =
          children.length > 1
            ? (children as (data: T, utils: DataLoaderRenderProps<T>) => React.ReactNode)(
                data,
                renderProps,
              )
            : (children as (data: T) => React.ReactNode)(data);
        return result;
      } catch {
        // Fallback to simple call if inspection fails
        return (children as (data: T) => React.ReactNode)(data);
      }
    }
    return null;
  }, [children, data, renderProps]);

  return (
    <Suspense fallback={LoadingComponent}>{error ? renderError(error) : renderChildren()}</Suspense>
  );
}

DataLoader.displayName = 'DataLoader';

/**
 * Hook version of DataLoader for use outside of JSX.
 *
 * @template T The type of the loaded data.
 * @param url The URL to fetch data from.
 * @param options DataLoaderProps<T> minus children, LoadingComponent, and ErrorComponent.
 * @returns The result of useSuspenseQuery for the given query.
 *
 * @example
 * ```tsx
 * const { data } = useDataLoader<User[]>('/api/users');
 * ```
 */
export function useDataLoader<T = unknown>(
  url: string,
  options: Omit<DataLoaderProps<T>, 'children' | 'LoadingComponent' | 'ErrorComponent'> = {},
) {
  const {
    queryOptions = {},
    fetcherOptions = {},
    params = {},
    queryKey,
    onSuccess,
    onError,
    transform,
    staleTime = 1000 * 60 * 5,
    refetchInterval = 1000 * 60 * 5,
    refetchOnWindowFocus = false,
    refetchOnReconnect = true,
  } = options;

  const finalQueryKey = useMemo(() => {
    if (queryKey) return queryKey;
    const headers = (fetcherOptions as FetcherOptions)?.headers;
    const timeout = (fetcherOptions as FetcherOptions)?.timeout;
    return ['dataloader', url, params, headers, timeout] as const;
  }, [queryKey, url, params, fetcherOptions]);

  const enhancedFetcherOptions = useMemo(
    (): FetcherOptions => ({
      retries: 3,
      retryDelay: 1000,
      timeout: 30000,
      onError: (err: unknown) => {
        if (typeof onError === 'function' && err instanceof Error) {
          onError(err);
        }
      },
      ...(fetcherOptions || {}),
    }),
    [fetcherOptions, onError],
  );

  const queryFn = useCallback(async (): Promise<T> => {
    const effect = pipe(
      get<T>(url, enhancedFetcherOptions, params as QueryParams),
      Effect.provide(FetchHttpClient.layer),
    );

    const result = await Effect.runPromise(effect);
    const finalResult = transform && typeof transform === 'function' ? transform(result) : result;

    if (typeof onSuccess === 'function') {
      onSuccess(finalResult);
    }

    return finalResult;
  }, [url, enhancedFetcherOptions, params, transform, onSuccess]);

  const queryOptionsWithDefaults: UseSuspenseQueryOptions<T, Error, T, QueryKey> = useMemo(
    () => ({
      queryKey: finalQueryKey as unknown as readonly unknown[],
      queryFn,
      staleTime: staleTime as number,
      refetchInterval: refetchInterval as number,
      refetchOnWindowFocus: refetchOnWindowFocus as boolean,
      refetchOnReconnect: refetchOnReconnect as boolean,
      retry: (failureCount: number, error: unknown) => {
        if (
          error instanceof FetcherError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
      ...(queryOptions || {}),
    }),
    [
      finalQueryKey,
      queryFn,
      staleTime,
      refetchInterval,
      refetchOnWindowFocus,
      refetchOnReconnect,
      queryOptions,
    ],
  );

  return useSuspenseQuery<T, Error, T, QueryKey>(queryOptionsWithDefaults);
}

export default DataLoader;
