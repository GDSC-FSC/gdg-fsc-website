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

import {
    defaultShouldDehydrateQuery,
    MutationCache,
    QueryCache,
    QueryClient,
} from '@tanstack/react-query';
import { cache } from 'react';
import SuperJSON from 'superjson';
import { logger } from '../../../../interface';

const fetchWithSuperJSON = async (url: string): Promise<any> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const contentType = response.headers.get('Content-Type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Response is not JSON');
  }

  const text = await response.text();
  try {
    return SuperJSON.parse(text);
  } catch (error) {
    console.error('Failed to parse response as SuperJSON:', error);
    throw new Error('Failed to parse response');
  }
};

export const createQueryClient = cache(() => {
  let queryClient: QueryClient | null = null;

  return (): QueryClient => {
    if (!queryClient) {
      queryClient = new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            logger.error(`Query error: ${error}`, query);
          },
          onSuccess: (data, query) => {
            logger.debug('Query success', { data, query });
          },
          onSettled: (data, error, query) => {
            logger.debug('Query settled', { data, error, query });
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            logger.error(`Mutation error: ${error}`, {
              message: error.message,
              stack: error.stack,
            });
            return Promise.resolve();
          },
          onSuccess: (data, variables, context, mutation) => {
            logger.success('Mutation succeeded', {
              data,
              variables,
              context,
              mutationKey: mutation?.options?.mutationKey,
              mutationFn: mutation?.options?.mutationFn?.name || 'anonymous',
            });
            return Promise.resolve();
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
            queryFn: async ({ queryKey }) => fetchWithSuperJSON(queryKey[0] as string),
            retry: 2,
            retryOnMount: false,
          },
          dehydrate: {
            serializeData: SuperJSON.serialize,
            shouldDehydrateQuery: (query) =>
              typeof defaultShouldDehydrateQuery !== 'undefined'
                ? defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
                : query.state.status === 'pending',
          },
          hydrate: {
            deserializeData: SuperJSON.deserialize,
          },
        },
      });
    }
    return queryClient;
  };
})();
