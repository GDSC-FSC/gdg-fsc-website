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

import { Context, Effect, Layer } from 'effect';
import { EventsDAO, EventsDAOLive } from '../dal/dao/events-dao';
import type { EventEntity } from '../dal/models/event-entity';

/**
 * Error types for the Events service.
 */
export class EventNotFoundError {
  readonly _tag = 'EventNotFoundError';
  constructor(readonly id: string) {}
}

export class EventsFetchError {
  readonly _tag = 'EventsFetchError';
  constructor(readonly message: string) {}
}

/**
 * Events Service interface.
 */
export interface IEventsService {
  /** Get all events */
  getAllEvents(): Effect.Effect<EventEntity[], EventsFetchError>;

  /** Get upcoming events only */
  getUpcomingEvents(): Effect.Effect<EventEntity[], EventsFetchError>;

  /** Get past events only */
  getPastEvents(): Effect.Effect<EventEntity[], EventsFetchError>;

  /** Get a single event by ID */
  getEventById(id: string): Effect.Effect<EventEntity, EventNotFoundError | EventsFetchError>;

  /** Search events by title */
  searchEvents(query: string): Effect.Effect<EventEntity[], EventsFetchError>;
}

/**
 * Events Service Effect tag.
 */
export class EventsService extends Context.Tag('EventsService')<EventsService, IEventsService>() {}

/**
 * Live implementation of EventsService.
 */
export const EventsServiceLive = Layer.effect(
  EventsService,
  Effect.gen(function* () {
    const dao = yield* EventsDAO;

    const wrapDaoError = <A>(effect: Effect.Effect<A, Error>): Effect.Effect<A, EventsFetchError> =>
      Effect.mapError(effect, (e) => new EventsFetchError(e.message));

    return EventsService.of({
      getAllEvents: () => wrapDaoError(dao.findAll()),

      getUpcomingEvents: () => wrapDaoError(dao.findUpcoming()),

      getPastEvents: () => wrapDaoError(dao.findPast()),

      getEventById: (id: string) =>
        Effect.gen(function* () {
          const event = yield* wrapDaoError(dao.findById(id));
          if (!event) {
            return yield* Effect.fail(new EventNotFoundError(id));
          }
          return event;
        }),

      searchEvents: (query: string) =>
        Effect.gen(function* () {
          const allEvents = yield* wrapDaoError(dao.findAll());
          const lowerQuery = query.toLowerCase();
          return allEvents.filter(
            (event) =>
              event.title?.toLowerCase().includes(lowerQuery) ||
              event.eventType?.toLowerCase().includes(lowerQuery),
          );
        }),
    });
  }),
);

/**
 * Full layer for EventsService including dependencies.
 */
export const EventsServiceLayer = EventsServiceLive.pipe(Layer.provide(EventsDAOLive));
