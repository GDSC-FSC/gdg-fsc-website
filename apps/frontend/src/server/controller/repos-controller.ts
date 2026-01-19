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

import { Elysia, t } from 'elysia';
import { logger } from '../../../../../packages/shared/utils/src';

const GITHUB_ORG = 'GDSC-FSC';
const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetches repositories from GitHub API server-side to avoid CORS issues.
 */
const fetchGitHubRepos = async (perPage = 100): Promise<unknown[]> => {
  const url = `${GITHUB_API_BASE}/orgs/${GITHUB_ORG}/repos?per_page=${perPage}`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'GDG-FSC-Website',
      // Add GitHub token if available for higher rate limits
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });

  if (!response.ok) {
    logger.error(`GitHub API error: ${response.status} ${response.statusText}`);
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json() as Promise<unknown[]>;
};

/**
 * Elysia plugin that provides GitHub repos API proxy routes.
 * This proxies requests to GitHub's API server-side to avoid CORS issues
 * with the traceparent header from OpenTelemetry.
 */
export const reposController = new Elysia({ prefix: '/repos' }).get(
  '/',
  async ({ query }) => {
    const { per_page = 100 } = query;

    try {
      const repos = await fetchGitHubRepos(per_page);
      return repos;
    } catch (error) {
      logger.error('Failed to fetch GitHub repos:', error);
      return {
        error: 'Failed to fetch repositories',
        message: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
  {
    query: t.Object({
      per_page: t.Optional(t.Number({ default: 100 })),
    }),
    detail: {
      summary: 'List GitHub repositories',
      description: 'Proxies requests to GitHub API to fetch organization repositories',
      tags: ['Repositories'],
    },
  },
);

export type ReposController = typeof reposController;
