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

/**
 * Response DTO for a single event.
 */
export interface EventResponseDTO {
  /** Unique identifier */
  id: string;

  /** Event title */
  title: string | null;

  /** Thumbnail image URL */
  thumbnailLink: string | null;

  /** Details page URL */
  detailsLink: string | null;

  /** Event type/category */
  eventType?: string;

  /** Whether this is an upcoming event */
  isUpcoming?: boolean;
}

/**
 * Response DTO for a list of events with metadata.
 */
export interface EventsListResponseDTO {
  /** Array of events */
  data: EventResponseDTO[];

  /** Metadata about the response */
  meta: {
    /** Total count of events */
    total: number;

    /** Current page number */
    page: number;

    /** Items per page */
    limit: number;

    /** Total number of pages */
    totalPages: number;
  };
}

/**
 * Standard API response wrapper.
 */
export interface ApiResponseDTO<T> {
  /** Response status */
  status: number;

  /** Response message */
  message: string;

  /** Response payload */
  data?: T;

  /** Error details (optional) */
  error?: string;
}
