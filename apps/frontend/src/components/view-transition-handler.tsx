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

import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { logger } from '../../../../packages/shared/utils/src';

export const ViewTransitionHandler = () => {
  useLocation();
  const initialLoadRef = useRef(true);

  const handleViewTransition = useCallback(() => {
    if (!document.startViewTransition) {
      logger.warn('View Transitions API not supported by this browser.');
      return;
    }

    // Capture the old state of the DOM
    document.startViewTransition(() => {
      // Update the DOM to the new state (React Router handles this by rendering the new route)
      // flushSync ensures that all DOM updates are applied synchronously before the transition starts.
      // This is crucial for View Transitions to correctly capture the "before" and "after" states.
      flushSync(() => {
        // You might still want to apply classes for global view transition styling if needed
        // document.body.classList.add("view-transition-group");
      });
    });
  }, []);

  // Trigger the view transition whenever the location changes
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
    }
    // This effect runs on initial render and whenever location.pathname changes
    // To ensure it only runs on actual route changes (not initial load if you don't want a transition then),
    // you might want to track if it's the very first render.
    // For now, it will trigger on initial load too if you don't add extra logic.
    // console.log("Route changed to:", location.pathname); // For debugging
    handleViewTransition();
  }, [handleViewTransition]);

  return null; // This component doesn't render anything visible
};
