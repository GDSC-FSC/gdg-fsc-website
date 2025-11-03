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
  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: app.name,
    url: app.url,
    image: app.logo,
    logo: app.logo,
    sameAs: [
      'https://www.linkedin.com/groups/12917927/',
      'https://www.instagram.com/gdsc.farmingdale/',
    ],
  } as const;
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
   * Handles view transitions between pages using the View Transitions API
   * Adds and removes transition classes for animation
   */
  // const handleViewTransition = useCallback(() => {
  // 	if (!document.startViewTransition) return;

  // 	document.startViewTransition(() => {
  // 		flushSync(() => {
  // 			document.body.classList.add("view-transition-group");
  // 			document.body.classList.remove("view-transition-group");
  // 		});
  // 	});
  // }, []);

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
    links.forEach((link) => observerRef.current?.observe(link));

    document.addEventListener('contextmenu', handleContextMenu);
    // window.addEventListener("navigate", handleViewTransition);

    return () => {
      observerRef.current?.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu);
      // window.removeEventListener("navigate", handleViewTransition);

      speculationScriptsRef.current.forEach((link) => {
        const script = document.querySelector(`script[data-speculation="${link}"]`);
        script?.remove();
      });
    };
  }, [handleContextMenu, handleIntersection /* handleViewTransition */]);

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
        strategy="beforeInteractive"
        type="speculationrules"
        dangerouslySetInnerHTML={{
          __html: Stringify(baseSpeculationRules),
        }}
        onError={(event) => {
          console.error('Error loading speculation rules script:', event);
        }}
      />

      <script
        type="application/ld+json"
        id="schema-org"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: Stringify(schemaOrg),
        }}
        onError={(event) => {
          console.error('Error loading Schema.org script:', event);
        }}
      />

      <script
        type="application/ld+json"
        id="schema-org-extended"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: Stringify(organizationSchema),
        }}
        onError={(event) => {
          console.error('Error loading Schema.org extended script:', event);
        }}
      />
    </>
  );
};

Scripts.displayName = 'Scripts';
export default Scripts;
