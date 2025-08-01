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

import type React from 'react';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createGlobalStore, type StoreState } from '../../../core';

/**
 * React context to provide the global store throughout the application. The context
 * holds a reference to the store created by createGlobalStore or null if not yet initialized.
 *
 * @type {React.Context<ReturnType<typeof createGlobalStore> | null>}
 */
const GlobalStoreContext = createContext<ReturnType<typeof createGlobalStore> | null>(null);

/**
 * GlobalStoreProvider component that provides the global store to the React component tree.
 * This component initializes the store on first render and maintains a consistent reference
 * to it using useRef to prevent unnecessary re-renders.
 *
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the global store
 * @returns {React.JSX.Element} GlobalStoreProvider component wrapping the children with the store context
 * @example
 * ```tsx
 * <GlobalStoreProvider>
 *   <App />
 * </GlobalStoreProvider>
 * ```
 */
export const GlobalStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof createGlobalStore>>(createGlobalStore());
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }
  return (
    <GlobalStoreContext.Provider value={storeRef.current}>{children}</GlobalStoreContext.Provider>
  );
};

/**
 * Custom hook to access and select data from the global store.
 * This hook must be used within a component that is wrapped by GlobalStoreProvider.
 *
 * @template T The type of the selected state slice
 * @param {function} selector - Selector function that extracts and returns the desired state slice
 * @param {StoreState} selector.state - The complete store state object
 * @returns {T} The selected state slice
 * @throws {Error} If used outside of a GlobalStoreProvider
 * @example
 * ```tsx
 * const userName = useGlobalStore((state) => state.user.name);
 * const userAge = useGlobalStore((state) => state.user.age);
 * ```
 */
export const useGlobalStore = <T,>(selector: (state: StoreState) => T) => {
  const store = useContext(GlobalStoreContext);
  if (!store) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return useStore(store, selector);
};
