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

import {
  // @ts-nocheck
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from '@effect/platform';
import { Duration, Effect, pipe, Schedule } from 'effect';

declare const EMPTY = '';

/**
 * @module effect-fetcher
 *
 * Type-safe, Effect-based HTTP data fetching utilities for use with Effect-TS and React Query.
 *
 * This module provides a generic, type-safe fetcher utility and convenience functions for all HTTP verbs.
 * It supports retries, timeouts, custom headers, error handling, and integrates with Effect-TS for composable async flows.
 *
 * ## Features
 * - Type-safe HTTP requests for all verbs (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD)
 * - Effect-based error handling and retry logic
 * - Customizable headers, timeouts, and retry strategies
 * - Rich error context via FetcherError
 * - Query parameter serialization
 * - Designed for use with Effect-TS and React Query
 *
 * @see FetcherError
 * @see fetcher
 * @see get
 * @see post
 * @see put
 * @see patch
 * @see del
 * @see options
 * @see head
 *
 * @example
 * ```ts
 * import { get } from './effect-fetcher';
 * import { Effect } from 'effect';
 *
 * const effect = get<{ users: User[] }>('/api/users', { retries: 2 });
 * const result = await Effect.runPromise(effect);
 * console.log(result.users);
 * ```
 */

/**
 * Represents all supported HTTP methods for the fetcher utility.
 * @typedef {('GET'|'POST'|'PUT'|'PATCH'|'DELETE'|'OPTIONS'|'HEAD')} HttpMethod
 */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';

/**
 * Represents a type-safe map of query parameters.
 * Each value can be a string, number, boolean, null, undefined, or an array of those types.
 */
export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null | Array<string | number | boolean>
>;

/**
 * Represents a type-safe request body for HTTP methods that support a body.
 * Can be an object, array, string, number, boolean, or null.
 */
type RequestBody = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

/**
 * Configuration options for the fetcher utility.
 * @property {number} [retries] Number of times to retry the request on failure.
 * @property {number} [retryDelay] Delay in milliseconds between retries.
 * @property {(error: unknown) => void} [onError] Optional callback invoked on error.
 * @property {number} [timeout] Timeout in milliseconds for the request.
 * @property {Record<string, string>} [headers] Additional headers to include in the request.
 */
export interface FetcherOptions {
  retries?: number;
  retryDelay?: number;
  onError?: (error: unknown) => void;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * Custom error class for fetcher-specific errors.
 * Includes additional context such as the request URL, HTTP status, response data, and attempt number.
 *
 * @class
 * @extends Error
 * @param {string} message Error message.
 * @param {string} url The URL that was requested.
 * @param {number} [status] Optional HTTP status code.
 * @param {unknown} [responseData] Optional response data from the server.
 * @param {number} [attempt] Optional attempt number (for retries).
 * @property {string} url The URL that was requested.
 * @property {number} [status] Optional HTTP status code.
 * @property {unknown} [responseData] Optional response data from the server.
 * @property {number} [attempt] Optional attempt number (for retries).
 *
 * @example
 * try {
 *   await Effect.runPromise(get('/api/boom'));
 * } catch (e) {
 *   if (e instanceof FetcherError) {
 *     console.error(e.status, e.responseData);
 *   }
 * }
 */
export class FetcherError extends Error {
  /**
   * @param {string} message - Error message.
   * @param {string} url - The URL that was requested.
   * @param {number} [status] - Optional HTTP status code.
   * @param {unknown} [responseData] - Optional response data from the server.
   * @param {number} [attempt] - Optional attempt number (for retries).
   */
  constructor(
    message: string,
    public readonly url: string,
    public readonly status?: number,
    public readonly responseData?: unknown,
    public readonly attempt?: number,
  ) {
    super(message);
    this.name = 'FetcherError';
    Object.setPrototypeOf(this, FetcherError.prototype);
  }

  /**
   * Returns a string representation of the FetcherError.
   * @returns {string}
   */
  toString(): string {
    return `FetcherError: ${this.message} (URL: ${this.url}${this.status ? `, Status: ${this.status}` : ''}${this.attempt ? `, Attempt: ${this.attempt}` : ''})`;
  }
}

// --- Overloaded function signatures for type safety ---

/**
 * Performs a GET request.
 *
 * @template T
 * @function
 * @param {string} input The URL to request.
 * @param {"GET"} [method] The HTTP method (GET).
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 * @example
 * ```ts
 * const effect = get<{ foo: string }>("/api/foo");
 * const result = await Effect.runPromise(effect);
 * ```
 */
export function fetcher<T = unknown>(
  input: string,
  method?: 'GET',
  options?: FetcherOptions,
  params?: QueryParams,
): Effect.Effect<T, FetcherError, HttpClient.HttpClient>;

/**
 * Performs a POST, PUT, or PATCH request with a request body.
 *
 * @template T
 * @function
 * @param {string} input The URL to request.
 * @param {"POST"|"PUT"|"PATCH"} method The HTTP method.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @param {RequestBody} [body] The request body.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 * @example
 * ```ts
 * const effect = post<{ ok: boolean }>("/api/bar", { foo: "bar" });
 * const result = await Effect.runPromise(effect);
 * ```
 */
export function fetcher<T = unknown>(
  input: string,
  method: 'POST' | 'PUT' | 'PATCH',
  options?: FetcherOptions,
  params?: QueryParams,
  body?: RequestBody,
): Effect.Effect<T, FetcherError, HttpClient.HttpClient>;

/**
 * Performs a DELETE, OPTIONS, or HEAD request.
 *
 * @template T
 * @function
 * @param {string} input The URL to request.
 * @param {"DELETE"|"OPTIONS"|"HEAD"} method The HTTP method.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export function fetcher<T = unknown>(
  input: string,
  method: 'DELETE' | 'OPTIONS' | 'HEAD',
  options?: FetcherOptions,
  params?: QueryParams,
): Effect.Effect<T, FetcherError, HttpClient.HttpClient>;

/**
 * Enhanced data fetching utility with type safety and Effect-based error handling.
 * Supports retries, timeouts, custom headers, and error handling.
 *
 * @template T
 * @function
 * @param {string} input The URL to request.
 * @param {HttpMethod} [method="GET"] The HTTP method to use.
 * @param {FetcherOptions} [options={}] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @param {RequestBody} [body] Optional request body (for methods that support it).
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @throws {FetcherError} If the request fails, times out, or returns a non-2xx status.
 * @example
 * ```ts
 * // Example: Type-safe GET request with error handling and retries
 * const effect = pipe(
 *   get<{ status: string }>("/api/health", {
 *     retries: 1,
 *     retryDelay: 1_000,
 *     timeout: 10_000,
 *     onError: (error) => {
 *       console.error("Request error details:", error)
 *       if (error instanceof FetcherError) {
 *         console.error("Response data:", error.responseData)
 *       }
 *     }
 *   }),
 *   Effect.provide(FetchHttpClient.layer)
 * )
 * // Run with: await Effect.runPromise(effect)
 * ```
 */
export function fetcher<T = unknown>(
  input: string,
  method: HttpMethod = 'GET',
  options: FetcherOptions = {},
  params?: QueryParams,
  body?: RequestBody,
): Effect.Effect<T, FetcherError, HttpClient.HttpClient> {
  const { retries = 0, retryDelay = 1_000, onError, timeout = 10_000, headers = {} } = options;

  /**
   * Builds a query string from the provided query parameters.
   * Handles arrays and skips null/undefined values.
   *
   * @param {QueryParams} [params] - Query parameters to serialize.
   * @returns {string} The serialized query string.
   */
  const buildQueryString = (params?: QueryParams): string => {
    if (!params) return EMPTY;
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value == null) return;

      if (Array.isArray(value)) {
        value
          .filter((item): item is string | number | boolean => item != null)
          .forEach((item) => urlParams.append(key, String(item)));
      } else {
        urlParams.append(key, String(value));
      }
    });

    return urlParams.toString();
  };

  const url = params ? `${input}?${buildQueryString(params)}` : input;

  /**
   * Builds a type-safe HttpClientRequest for the given method and URL.
   *
   * @param {HttpMethod} method - The HTTP method.
   * @param {string} url - The request URL.
   * @returns {HttpClientRequest.HttpClientRequest}
   * @throws {Error} If the HTTP method is not supported.
   */
  const buildRequest = (method: HttpMethod, url: string): HttpClientRequest.HttpClientRequest => {
    switch (method) {
      case 'GET':
        return HttpClientRequest.get(url);
      case 'POST':
        return HttpClientRequest.post(url);
      case 'PUT':
        return HttpClientRequest.put(url);
      case 'PATCH':
        return HttpClientRequest.patch(url);
      case 'DELETE':
        return HttpClientRequest.del(url);
      case 'OPTIONS':
        return HttpClientRequest.options(url);
      case 'HEAD':
        return HttpClientRequest.head(url);
      default: {
        // This should never happen with proper typing, but provides runtime safety
        const _exhaustive: never = method;
        throw new Error(`Unsupported HTTP method: ${method}`);
      }
    }
  };

  return Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    let attempt = 0;

    // Build the request object
    let req = buildRequest(method, url);
    req = HttpClientRequest.setHeaders(headers)(req);

    // Add body for methods that support it with proper error handling
    if (body != null && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      req = yield* pipe(
        HttpClientRequest.bodyJson(body)(req),
        Effect.mapError(
          (error) =>
            new FetcherError(
              `Failed to serialize request body: ${error instanceof Error ? error.message : String(error)}`,
              url,
              undefined,
              undefined,
              attempt,
            ),
        ),
      );
    }

    /**
     * Wraps an Effect with a timeout, converting timeout errors to FetcherError.
     *
     * @template A, E, R
     * @param {Effect.Effect<A, E, R>} eff - The effect to wrap.
     * @returns {Effect.Effect<A, FetcherError | E, R>}
     */
    const withTimeout = <A, E, R>(
      eff: Effect.Effect<A, E, R>,
    ): Effect.Effect<A, FetcherError | E, R> =>
      pipe(
        eff,
        Effect.timeoutFail({
          duration: Duration.millis(timeout),
          onTimeout: () =>
            new FetcherError('Request timed out', url, undefined, undefined, attempt),
        }),
      );

    // Retry schedule with exponential backoff and maximum number of retries
    const retrySchedule = Schedule.intersect(
      Schedule.exponential(Duration.millis(retryDelay)),
      Schedule.recurs(retries),
    );

    /**
     * Executes the HTTP request, handling errors, HTTP status, and response parsing.
     * Retries and timeouts are handled externally.
     *
     * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>}
     */
    const executeRequest = Effect.gen(function* () {
      attempt++;

      // Execute the HTTP request and handle network/transport errors
      const response = yield* pipe(
        client.execute(req),
        withTimeout,
        Effect.mapError((error) => {
          if (error instanceof FetcherError) return error;

          return new FetcherError(
            error instanceof Error ? error.message : String(error),
            url,
            undefined,
            undefined,
            attempt,
          );
        }),
      );

      // Check for HTTP errors (non-2xx status codes)
      if (response.status < 200 || response.status >= 300) {
        const errorData = yield* pipe(
          response.json,
          Effect.catchAll(() => Effect.succeed(undefined)),
        );

        const error = new FetcherError(
          `HTTP ${response.status}: ${response.text || 'Request failed'}`,
          url,
          response.status,
          errorData,
          attempt,
        );

        if (onError) onError(error);
        return yield* Effect.fail(error);
      }

      // Parse response data as JSON, with fallback to text and detailed error reporting
      const data = yield* pipe(
        response.json,
        Effect.catchAll((error) => {
          // Try to get response text for better debugging
          return pipe(
            response.text,
            Effect.flatMap((text) => {
              const errorMessage = `Failed to parse JSON response. Status: ${response.status}, Content-Type: ${response.headers['Content-Type'] || 'unknown'}, Body: ${text.slice(0, 200)}${text.length > 200 ? '...' : ''}`;
              return Effect.fail(
                new FetcherError(
                  errorMessage,
                  url,
                  response.status,
                  { originalError: error, responseText: text },
                  attempt,
                ),
              );
            }),
            Effect.catchAll(() =>
              Effect.fail(
                new FetcherError(
                  `Failed to parse response: ${error instanceof Error ? error.message : String(error)}`,
                  url,
                  response.status,
                  undefined,
                  attempt,
                ),
              ),
            ),
          );
        }),
      );

      return data as T;
    });

    // Run the request with retry and error handling
    return yield* pipe(
      executeRequest,
      Effect.retry(retrySchedule),
      Effect.catchAll((error) => {
        if (error instanceof FetcherError) {
          if (onError) onError(error);
          return Effect.fail(error);
        }

        const fetcherError = new FetcherError(String(error), url, undefined, undefined, attempt);

        if (onError) onError(fetcherError);
        return Effect.fail(fetcherError);
      }),
    );
  });
}

/**
 * Convenience function for GET requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 * @example
 * ```ts
 * const effect = get<{ foo: string }>("/api/foo");
 * const result = await Effect.runPromise(effect);
 * ```
 */
export const get = <T = unknown>(url: string, options?: FetcherOptions, params?: QueryParams) =>
  fetcher<T>(url, 'GET', options, params);

/**
 * Convenience function for POST requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {RequestBody} [body] The request body.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 * @example
 * ```ts
 * const effect = post<{ ok: boolean }>("/api/bar", { foo: "bar" });
 * const result = await Effect.runPromise(effect);
 * ```
 */
export const post = <T = unknown>(
  url: string,
  body?: RequestBody,
  options?: FetcherOptions,
  params?: QueryParams,
) => fetcher<T>(url, 'POST', options, params, body);

/**
 * Convenience function for PUT requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {RequestBody} [body] The request body.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export const put = <T = unknown>(
  url: string,
  body?: RequestBody,
  options?: FetcherOptions,
  params?: QueryParams,
) => fetcher<T>(url, 'PUT', options, params, body);

/**
 * Convenience function for PATCH requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {RequestBody} [body] The request body.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export const patch = <T = unknown>(
  url: string,
  body?: RequestBody,
  options?: FetcherOptions,
  params?: QueryParams,
) => fetcher<T>(url, 'PATCH', options, params, body);

/**
 * Convenience function for DELETE requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export const del = <T = unknown>(url: string, options?: FetcherOptions, params?: QueryParams) =>
  fetcher<T>(url, 'DELETE', options, params);

/**
 * Convenience function for OPTIONS requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export const options = <T = unknown>(url: string, options?: FetcherOptions, params?: QueryParams) =>
  fetcher<T>(url, 'OPTIONS', options, params);

/**
 * Convenience function for HEAD requests.
 *
 * @template T
 * @function
 * @param {string} url The URL to request.
 * @param {FetcherOptions} [options] Optional fetcher configuration.
 * @param {QueryParams} [params] Optional query parameters.
 * @returns {Effect.Effect<T, FetcherError, HttpClient.HttpClient>} An Effect that resolves to the response data of type T or fails with FetcherError.
 * @see fetcher
 */
export const head = <T = unknown>(url: string, options?: FetcherOptions, params?: QueryParams) =>
  fetcher<T>(url, 'HEAD', options, params);
