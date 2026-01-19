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

import { FetchHttpClient, type HttpClient } from '@effect/platform';
import { Context, Effect, Layer, pipe } from 'effect';
import { get } from '../../../../../../packages/shared/utils/src';
import { EventsFactory } from '../../factory/events-factory';
import type { EventEntity } from '../models/event-entity';
import { EventsArraySchema } from '../models/event-entity';

/**
 * API endpoints for fetching events.
 */
const API_ENDPOINTS = {
  upcoming: 'https://gdsc-api.onrender.com/api/v1/events/upcoming',
  past: 'https://gdsc-api.onrender.com/api/v1/events/past',
} as const;

/**
 * Fetches events from the API with Effect Schema validation.
 */
const fetchEvents = (
  url: string,
  isUpcoming: boolean,
): Effect.Effect<EventEntity[], Error, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const rawEvents = yield* get(url, {
      schema: EventsArraySchema,
      retries: 2,
      retryDelay: 1000,
      timeout: 15000,
    });
    return rawEvents.map((raw) => EventsFactory.createFromRaw(raw, isUpcoming));
  }).pipe(
    Effect.mapError(
      (error): Error => new Error(`Failed to fetch events from ${url}: ${String(error)}`),
    ),
  );

/**
 * Events Data Access Object interface.
 */
export interface IEventsDAO {
  /** Find all events (upcoming + past) */
  findAll(): Effect.Effect<EventEntity[], Error>;

  /** Find only upcoming events */
  findUpcoming(): Effect.Effect<EventEntity[], Error>;

  /** Find only past events */
  findPast(): Effect.Effect<EventEntity[], Error>;

  /** Find a single event by ID */
  findById(id: string): Effect.Effect<EventEntity | null, Error>;
}

/**
 * Events DAO Effect service tag.
 */
export class EventsDAO extends Context.Tag('EventsDAO')<EventsDAO, IEventsDAO>() {}

/**
 * Live implementation of EventsDAO using the real API endpoints.
 */
/**
 * Cache configuration
 */
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Module-level cache to persist across requests
const cache = {
  upcoming: null as CacheEntry<EventEntity[]> | null,
  past: null as CacheEntry<EventEntity[]> | null,
};

/**
 * Live implementation of EventsDAO using the real API endpoints.
 */
export const EventsDAOLive = Layer.effect(
  EventsDAO,
  Effect.sync(() => {
    const getCachedOrFetch = (
      key: 'upcoming' | 'past',
      fetchFn: () => Effect.Effect<EventEntity[], Error, HttpClient.HttpClient>,
    ): Effect.Effect<EventEntity[], Error, HttpClient.HttpClient> => {
      const now = Date.now();
      const entry = cache[key];

      if (entry && now - entry.timestamp < CACHE_TTL) {
        return Effect.succeed(entry.data);
      }

      return pipe(
        fetchFn(),
        Effect.tap((events) =>
          Effect.sync(() => {
            cache[key] = {
              data: events,
              timestamp: now,
            };
          }),
        ),
      );
    };

    const fetchUpcoming = () => getCachedOrFetch('upcoming', () => fetchEvents(API_ENDPOINTS.upcoming, true));
    const fetchPast = () => getCachedOrFetch('past', () => fetchEvents(API_ENDPOINTS.past, false));

    return EventsDAO.of({
      findAll: () =>
        pipe(
          Effect.all([fetchUpcoming(), fetchPast()]),
          Effect.map(([upcoming, past]) => [...upcoming, ...past]),
          Effect.provide(FetchHttpClient.layer),
        ),

      findUpcoming: () => pipe(fetchUpcoming(), Effect.provide(FetchHttpClient.layer)),

      findPast: () => pipe(fetchPast(), Effect.provide(FetchHttpClient.layer)),

      findById: (id: string) =>
        pipe(
          Effect.all([fetchUpcoming(), fetchPast()]),
          Effect.map(([upcoming, past]) => {
            const allEvents = [...upcoming, ...past];
            return allEvents.find((e) => e.id === id) ?? null;
          }),
          Effect.provide(FetchHttpClient.layer),
        ),
    });
  }),
);
