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

import type { EventEntity, RawEventData } from '../dal/models/event-entity';

/**
 * Factory for creating EventEntity instances.
 */
export class EventsFactory {
  /**
   * Creates a new EventEntity with default values.
   */
  static create(data: Partial<EventEntity> = {}): EventEntity {
    return {
      id: data.id ?? crypto.randomUUID().slice(0, 16),
      title: data.title ?? null,
      thumbnailLink: data.thumbnailLink ?? null,
      detailsLink: data.detailsLink ?? null,
      eventType: data.eventType,
      startDate: data.startDate,
      endDate: data.endDate,
      isUpcoming: data.isUpcoming ?? true,
    };
  }

  /**
   * Creates an EventEntity from raw API data.
   */
  static createFromRaw(raw: RawEventData, isUpcoming = true): EventEntity {
    const id = raw.detailsLink
      ? btoa(raw.detailsLink).slice(-16)
      : crypto.randomUUID().slice(0, 16);

    return {
      id,
      title: raw.title,
      thumbnailLink: raw.thumbnailLink,
      detailsLink: raw.detailsLink,
      isUpcoming,
    };
  }

  /**
   * Creates multiple EventEntity instances from raw data array.
   */
  static createBatchFromRaw(rawData: RawEventData[], isUpcoming = true): EventEntity[] {
    return rawData.map((raw) => EventsFactory.createFromRaw(raw, isUpcoming));
  }

  toString(): string {
    return 'EventsFactory';
  }
}
