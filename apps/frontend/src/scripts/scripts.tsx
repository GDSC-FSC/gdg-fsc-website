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

import { logger } from '@gdg-fsc/utils';
import { useCallback, useEffect, useRef } from 'react';
import { app } from '../constants';
import { Stringify } from '../utils';
import { generateSchema } from './schema';

/**
 * Configuration type for preload/prefetch behavior
 * @typedef {Object} PreloadConfig
 * @property {string[]} prerenderPaths - Paths to prerender eagerly for instant navigation
 * @property {string[]} prefetchPaths - Paths to prefetch in the background
 * @property {string[]} excludePaths - Paths to exclude from preloading
 */
type PreloadConfig = {
  prerenderPaths: string[];
  prefetchPaths: string[];
  excludePaths: string[];
};

export const Scripts = () => {
  /**
   * Configuration object defining paths for preloading behavior
   */
  const config: PreloadConfig = {
    prerenderPaths: ['/'],
    prefetchPaths: ['/*'],
    excludePaths: ['/api/v1/*'],
  };

  /**
   * Ref to store the intersection observer instance
   */
  const observerRef = useRef<IntersectionObserver | null>(null);

  /**
   * Ref to track which links have already had speculation rules added
   */
  const speculationScriptsRef = useRef<Set<string>>(new Set());

  /**
   * Prevents default context menu behavior
   * @param {MouseEvent} event - The context menu event
   */
  const handleContextMenu = useCallback((event: MouseEvent) => {
    event.preventDefault();
  }, []);

  /**
   * Creates a speculation rules script element
   * @param {object} rules - The speculation rules to apply
   * @returns {HTMLScriptElement} The created script element
   */
  const createSpeculationScript = useCallback((rules: object, link: string) => {
    const script = document.createElement('script');
    script.type = 'speculationrules';
    script.text = Stringify(rules);
    script.dataset.speculation = link;
    return script;
  }, []);

  /**
   * Adds dynamic speculation rules for a specific link
   * @param {string} link - The URL to add speculation rules for
   */
  const addDynamicSpeculation = useCallback(
    (link: string) => {
      if (speculationScriptsRef.current.has(link)) return;

      const rules = {
        prefetch: [
          {
            source: 'list',
            urls: [link],
          },
        ],
      };

      const script = createSpeculationScript(rules, link);
      document.head.appendChild(script);
      speculationScriptsRef.current.add(link);
    },
    [createSpeculationScript],
  );

  /**
   * Handles intersection observer entries
   * Adds speculation rules for links as they become visible
   * @param {IntersectionObserverEntry[]} entries - The intersection entries to process
   */
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target.getAttribute('href');
          if (link?.startsWith('/')) {
            addDynamicSpeculation(link);
          }
        }
      });
    },
    [addDynamicSpeculation],
  );
  /**
   * Sets up intersection observer, event listeners, and cleanup
   * - Initializes intersection observer for link prefetching
   * - Adds event listeners for context menu and navigation
   * - Cleans up observers and listeners on unmount
   */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    const links = document.querySelectorAll('a[href^="/"]');
    links.forEach((link) => {
      observerRef.current?.observe(link);
      addDynamicSpeculation(link.getAttribute('href') || '');
    });

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      observerRef.current?.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu);

      speculationScriptsRef.current.forEach((link) => {
        const script = document.querySelector(`script[data-speculation="${link}"]`);
        script?.remove();
      });
    };
  }, [handleContextMenu, handleIntersection, addDynamicSpeculation]);

  /**
   * Base speculation rules configuration for prerendering and prefetching
   * Defines rules for:
   * - Prerendering specific paths with different eagerness levels
   * - Prefetching paths and patterns with conditions
   * - Excluding certain paths from speculation
   */
  const baseSpeculationRules = {
    prerender: [
      {
        source: 'list',
        urls: config.prerenderPaths,
        eagerness: 'moderate',
      },
      {
        where: {
          and: [
            { href_matches: '/*' },
            ...config.excludePaths.map((path) => ({
              not: { href_matches: path },
            })),
          ],
        },
        eagerness: 'conservative',
      },
    ],
    prefetch: [
      {
        source: 'list',
        urls: config.prefetchPaths,
      },
      {
        where: {
          and: [
            { href_matches: '/resources/*' },
            { not: { selector_matches: '[data-no-prefetch]' } },
          ],
        },
        eagerness: 'conservative',
      },
    ],
  } as const;

  const organizationSchema = generateSchema({
    type: 'Organization',
    name: app.name,
    url: app.url,
    thumbnailUrl: app.logo,
    logo: app.logo,
    sameAs: [
      'https://www.linkedin.com/groups/12917927/',
      'https://www.instagram.com/gdsc.farmingdale/',
    ],
  });
  return (
    <>
      <script
        id="speculation-rules"
        type="speculationrules"
        onError={(event) => {
          logger.error('Error loading speculation rules script:', event);
        }}
      >
        {`${Stringify(baseSpeculationRules)}`}
      </script>

      <script
        type="application/ld+json"
        id="schema-org"
        onError={(event) => {
          logger.error('Error loading Schema.org script:', event);
        }}
      >
        {`${Stringify(organizationSchema)}`}
      </script>
    </>
  );
};

Scripts.displayName = 'Scripts';
export default Scripts;
