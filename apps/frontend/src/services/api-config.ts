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

import { Schema } from 'effect';

/**
 * Client-side API configuration for external services.
 * These APIs are called directly from the browser.
 */

/**
 * External GDSC API for events.
 * Uses Vite proxy in development to bypass CORS.
 */
export const EVENTS_API = {
  BASE_URL: '/api/events',
  UPCOMING: '/api/events/upcoming',
  PAST: '/api/events/past',
} as const;

/**
 * GitHub API for organization repositories.
 * Uses Vite proxy in development to bypass CORS.
 */
export const GITHUB_API = {
  ORG_REPOS: '/api/github/orgs/GDSC-FSC/repos?per_page=100',
} as const;

/**
 * Effect Schema for a single event from the external API.
 */
export const EventDTOSchema = Schema.Struct({
  id: Schema.String,
  title: Schema.NullOr(Schema.String),
  thumbnailLink: Schema.NullOr(Schema.String),
  detailsLink: Schema.NullOr(Schema.String),
  eventType: Schema.optional(Schema.String),
  isUpcoming: Schema.optional(Schema.Boolean),
});

export type EventDTO = Schema.Schema.Type<typeof EventDTOSchema>;

/**
 * Effect Schema for pagination metadata.
 */
export const PaginationMetaSchema = Schema.Struct({
  total: Schema.Number,
  page: Schema.Number,
  limit: Schema.Number,
  totalPages: Schema.Number,
});

export type PaginationMeta = Schema.Schema.Type<typeof PaginationMetaSchema>;

/**
 * Effect Schema for paginated events response.
 */
export const PaginatedEventsResponseSchema = Schema.Struct({
  data: Schema.Array(EventDTOSchema),
  meta: PaginationMetaSchema,
});

export type PaginatedEventsResponse = Schema.Schema.Type<typeof PaginatedEventsResponseSchema>;

/**
 * Transforms raw events array to paginated format.
 * @param rawEvents - Array of events from external API
 * @param page - Current page (1-indexed)
 * @param limit - Items per page
 */
export const transformEvents = (
  rawEvents: readonly EventDTO[],
  page = 1,
  limit = 20,
): PaginatedEventsResponse => {
  const startIndex = (page - 1) * limit;
  const paginatedEvents = rawEvents.slice(startIndex, startIndex + limit);

  return {
    data: [...paginatedEvents],
    meta: {
      total: rawEvents.length,
      page,
      limit,
      totalPages: Math.ceil(rawEvents.length / limit),
    },
  };
};
