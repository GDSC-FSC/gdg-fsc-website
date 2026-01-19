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

import { t } from 'elysia';

/**
 * Request DTO for fetching events list with optional filters.
 */
export const GetEventsRequestDTO = t.Object({
  /** Filter by event type */
  type: t.Optional(t.Union([t.Literal('upcoming'), t.Literal('past'), t.Literal('all')])),

  /** Page number for pagination (1-indexed) */
  page: t.Optional(t.Number({ minimum: 1, default: 1 })),

  /** Number of items per page */
  limit: t.Optional(t.Number({ minimum: 1, maximum: 100, default: 20 })),

  /** Search query string */
  search: t.Optional(t.String()),
});

/**
 * Request DTO for fetching a single event by ID.
 */
export const GetEventByIdRequestDTO = t.Object({
  /** The unique event identifier */
  id: t.String({ minLength: 1 }),
});

export type GetEventsRequestDTO = typeof GetEventsRequestDTO.static;
export type GetEventByIdRequestDTO = typeof GetEventByIdRequestDTO.static;
