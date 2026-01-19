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
 * Effect Schema for validating raw event data from the API.
 */
export const RawEventSchema = Schema.Struct({
  /** Event title */
  title: Schema.NullOr(Schema.String),

  /** URL to the event thumbnail image */
  thumbnailLink: Schema.NullOr(Schema.String),

  /** URL to the event details page */
  detailsLink: Schema.NullOr(Schema.String),
});

/**
 * Effect Schema for an array of events from the API.
 */
export const EventsArraySchema = Schema.Array(RawEventSchema);

/**
 * Type inferred from the raw event schema.
 */
export type RawEventData = Schema.Schema.Type<typeof RawEventSchema>;

/**
 * Represents an event entity in the data layer.
 */
export interface EventEntity {
  /** Unique identifier for the event */
  id: string;

  /** Title of the event */
  title: string | null;

  /** URL to the event thumbnail image */
  thumbnailLink: string | null;

  /** URL to the event details page */
  detailsLink: string | null;

  /** Type/category of the event (e.g., "Workshop", "Study Group") */
  eventType?: string;

  /** Event start date */
  startDate?: Date;

  /** Event end date */
  endDate?: Date;

  /** Whether this is an upcoming event (true) or past event (false) */
  isUpcoming?: boolean;
}
