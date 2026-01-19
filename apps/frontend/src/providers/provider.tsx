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

import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createQueryClient, GlobalStoreProvider, Providers, ThemeProvider } from '.';
import { TooltipProvider } from '../components/ui/tooltip';
export const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Providers
      providers={[
        [
          ThemeProvider,
          {
            attribute: 'class',
            defaultTheme: 'system',
            enableSystem: true,
            disableTransitionOnChange: true,
            storageKey: 'vite-ui-theme',
          },
        ],
        [GlobalStoreProvider, {}],
        [
          PersistQueryClientProvider,
          {
            client: createQueryClient()(),
            persistOptions: {
              persister: createSyncStoragePersister({
                storage: window.localStorage,
              }),
              maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            },
          },
        ],
        [TooltipProvider, {}],
      ]}
      node={children}
    />
  );
};

Provider.displayName = 'Provider';
export default Provider;
