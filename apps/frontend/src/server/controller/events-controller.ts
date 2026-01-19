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

import { Effect, Layer, Runtime } from 'effect';
import { Elysia } from 'elysia';
import type { EventEntity } from '../dal/models/event-entity';
import { GetEventByIdRequestDTO, GetEventsRequestDTO } from '../dto/events-request-dto';
import { EventsMapper } from '../mapper/events-mapper';
import { EventsService, EventsServiceLayer } from '../service/events-service';

// Create a runtime with the EventsService layer
const makeRuntime = () => {
  const layer = EventsServiceLayer;
  return Layer.toRuntime(layer).pipe(Effect.scoped, Effect.runSync);
};

let cachedRuntime: Runtime.Runtime<EventsService> | null = null;

const getRuntime = (): Runtime.Runtime<EventsService> => {
  cachedRuntime ??= makeRuntime();
  return cachedRuntime;
};

/**
 * Helper to run effects with the service layer.
 */
const runEffect = <A, E>(effect: Effect.Effect<A, E, EventsService>): Promise<A> =>
  Runtime.runPromise(getRuntime())(effect);

/**
 * Elysia plugin that provides events API routes.
 */
export const eventsController = new Elysia({ prefix: '/events' })
  .get(
    '/',
    async ({ query }) => {
      const { type = 'all', page = 1, limit = 20, search } = query;

      const effect = Effect.gen(function* () {
        const service = yield* EventsService;

        let events: EventEntity[];
        if (type === 'upcoming') {
          events = yield* service.getUpcomingEvents();
        } else if (type === 'past') {
          events = yield* service.getPastEvents();
        } else {
          events = yield* service.getAllEvents();
        }

        // Apply search filter if provided
        if (search) {
          const lowerSearch = search.toLowerCase();
          events = events.filter(
            (e) =>
              e.title?.toLowerCase().includes(lowerSearch) ||
              e.eventType?.toLowerCase().includes(lowerSearch),
          );
        }

        return EventsMapper.toListResponse(events, page, limit);
      }).pipe(
        Effect.catchTag('EventsFetchError', (err) =>
          Effect.succeed({
            data: [],
            meta: { total: 0, page, limit, totalPages: 0 },
            error: err.message,
          }),
        ),
      );

      return runEffect(effect);
    },
    {
      query: GetEventsRequestDTO,
      detail: {
        summary: 'List events',
        description: 'Returns a paginated list of events with optional filters',
        tags: ['Events'],
      },
    },
  )
  .get(
    '/upcoming',
    async ({ query }) => {
      const { page = 1, limit = 20 } = query;

      const effect = Effect.gen(function* () {
        const service = yield* EventsService;
        const events = yield* service.getUpcomingEvents();
        return EventsMapper.toListResponse(events, page, limit);
      }).pipe(
        Effect.catchTag('EventsFetchError', (err) =>
          Effect.succeed({
            data: [],
            meta: { total: 0, page, limit, totalPages: 0 },
            error: err.message,
          }),
        ),
      );

      return runEffect(effect);
    },
    {
      query: GetEventsRequestDTO,
      detail: {
        summary: 'List upcoming events',
        description: 'Returns upcoming events only',
        tags: ['Events'],
      },
    },
  )
  .get(
    '/past',
    async ({ query }) => {
      const { page = 1, limit = 20 } = query;

      const effect = Effect.gen(function* () {
        const service = yield* EventsService;
        const events = yield* service.getPastEvents();
        return EventsMapper.toListResponse(events, page, limit);
      }).pipe(
        Effect.catchTag('EventsFetchError', (err) =>
          Effect.succeed({
            data: [],
            meta: { total: 0, page, limit, totalPages: 0 },
            error: err.message,
          }),
        ),
      );

      return runEffect(effect);
    },
    {
      query: GetEventsRequestDTO,
      detail: {
        summary: 'List past events',
        description: 'Returns past events only',
        tags: ['Events'],
      },
    },
  )
  .get(
    '/:id',
    async ({ params, set }) => {
      const effect = Effect.gen(function* () {
        const service = yield* EventsService;
        const event = yield* service.getEventById(params.id);
        return {
          status: 200,
          message: 'Event found',
          data: EventsMapper.toDTO(event),
        };
      }).pipe(
        Effect.catchTag('EventNotFoundError', (err) =>
          Effect.succeed({
            status: 404,
            message: `Event not found: ${err.id}`,
            data: null,
          }),
        ),
        Effect.catchTag('EventsFetchError', (err) =>
          Effect.succeed({
            status: 500,
            message: `Failed to fetch event: ${err.message}`,
            data: null,
          }),
        ),
      );

      const result = await runEffect(effect);
      if (result.status === 404) {
        set.status = 404;
      } else if (result.status === 500) {
        set.status = 500;
      }
      return result;
    },
    {
      params: GetEventByIdRequestDTO,
      detail: {
        summary: 'Get event by ID',
        description: 'Returns a single event by its unique identifier',
        tags: ['Events'],
      },
    },
  );

export type EventsController = typeof eventsController;
