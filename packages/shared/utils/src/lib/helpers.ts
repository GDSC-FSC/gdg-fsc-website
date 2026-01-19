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

import { logger } from './logger.js';

/**
 * Converts an object to a formatted JSON string with proper indentation.
 *
 * @param {object} obj - The object to convert to a JSON string
 * @returns {string} A properly formatted JSON string representation of the input object with 2-space indentation
 *
 * @example
 * ```ts
 * const obj = { name: "John", age: 30 };
 * const jsonString = Stringify(obj);
 * // Returns:
 * // {
 * //   "name": "John",
 * //   "age": 30
 * // }
 * ```
 *
 * @remarks
 * - Uses JSON.stringify() internally with null replacer and 2-space indent
 * - Handles circular references by throwing an error
 * - Preserves object structure and nesting
 * - Useful for debugging, logging, and data serialization
 * - Safe with primitives, arrays, objects, null and undefined
 */
export const Stringify = (obj: object): string => {
  return JSON.stringify(obj, null, 2);
};

/**
 * Constructs a fully qualified URL based on the current globalThis's location,
 * with an optional path.
 *
 * @param {string} [path=''] - Optional path to append to the base URL
 * @returns {string} Complete URL with proper formatting and protocol
 *
 * @example
 * ```ts
 * // Assuming current page is "http://localhost:5173/dashboard"
 * getURL("api/users") // Returns "http://localhost:5173/api/users"
 * getURL() // Returns "http://localhost:5173"
 *
 * // Assuming current page is "[https://example.com/products](https://example.com/products)"
 * getURL("test") // Returns "[https://example.com/test](https://example.com/test)"
 * ```
 *
 * @remarks
 * - Uses globalThis.location.origin as the base URL.
 * - Removes trailing slashes from base URL.
 * - Removes leading slashes from path.
 * - Handles empty/undefined path gracefully.
 * - Suitable for client-side contexts where the API/resource is on the same origin.
 * - NOT recommended for defining a fixed API base URL across environments or for server-side use.
 */
export const getURL = (path = ''): string => {
  // Use the current globalThis's origin as the base URL.
  // globalThis.location.origin includes the protocol, hostname, and port (e.g., "https://example.com:8080")
  if (typeof globalThis === 'undefined') {
    // This function will not work correctly in a non-browser environment (e.g., during SSR or build processes)
    // where `globalThis` is not defined. We'll attempt to use environment variables for a more reliable default.
    const envBaseUrl =
      process?.env?.VITE_BASE_URL || process?.env?.NEXT_PUBLIC_BASE_URL || process?.env?.BASE_URL;

    if (envBaseUrl && typeof envBaseUrl === 'string') {
      // Remove trailing slashes for consistency
      return envBaseUrl.replace(/\/+$/, '');
    }

    logger.warn(
      "getURL: 'globalThis' is not defined and no environment base URL found. This function relies on client-side context. Returning empty string.",
    );
    // As a last resort, return an empty string to avoid misleading defaults.
    return '';
  }

  let url = globalThis.location.origin;

  // Remove any trailing slashes from the base URL (globalThis.location.origin typically doesn't have one, but for consistency)
  url = url.replace(/\/+$/, '');

  // Remove any leading slashes from the path
  const sanitizedPath = path.replace(/^\/+/, '');

  // Combine the URL and path, ensuring a single slash in between if a path exists
  return sanitizedPath ? `${url}/${sanitizedPath}` : url;
};

type Success<T> = {
  readonly success: true;
  readonly value: T;
};

type Failure<E> = {
  readonly success: false;
  readonly error: E;
};

type Result<T, E> = Success<T> | Failure<E>;

/**
 * Creates a successful result
 * @param value The value to wrap in a success result
 */
export const success = <T>(value: T): Success<T> => Object.freeze({ success: true, value });

/**
 * Creates a failed result
 * @param error The error to wrap in a failure result
 */
export const failure = <E>(error: E): Failure<E> => Object.freeze({ success: false, error });

type ExtractAsyncArgs<Args extends Array<unknown>> =
  Args extends Array<infer PotentialArgTypes> ? [PotentialArgTypes] : [];

export const catchError = async <Args extends Array<unknown>, ReturnType>(
  asyncFunction: (...args: ExtractAsyncArgs<Args>) => Promise<ReturnType>,
  ...args: ExtractAsyncArgs<Args>
): Promise<Result<ReturnType, Error>> => {
  const log = logger;
  try {
    const result = await asyncFunction(...args);
    return success(result);
  } catch (error) {
    log.error('catchError', { error });
    return failure(error instanceof Error ? error : new Error(String(error)));
  }
};

/**
 * Maps a successful result to a new value
 * @param fn Mapping function to apply to the successful value
 */
export const map =
  <T, U, E>(fn: (value: T) => U): ((result: Result<T, E>) => Result<U, E>) =>
  (result) =>
    result.success ? success(fn(result.value)) : result;

/**
 * Chains a result-returning function after a successful result
 * @param fn Function that returns a new result
 */
export const bindResult =
  <T, U, E>(fn: (value: T) => Result<U, E>): ((result: Result<T, E>) => Result<U, E>) =>
  (result) =>
    result.success ? fn(result.value) : result;

/**
 * Applies a series of functions to an input value, short-circuiting on the first failure
 * @param input Initial input value
 * @param functions Array of functions to apply sequentially
 * @returns Final result after applying all functions or first encountered failure
 */
export function railway<TInput, T1, E>(
  input: TInput,
  fn1: (input: TInput) => Result<T1, E>,
): Result<T1, E>;
export function railway<TInput, T1, T2, E>(
  input: TInput,
  fn1: (input: TInput) => Result<T1, E>,
  fn2: (input: T1) => Result<T2, E>,
): Result<T2, E>;
export function railway<TInput, T1, T2, T3, E>(
  input: TInput,
  fn1: (input: TInput) => Result<T1, E>,
  fn2: (input: T1) => Result<T2, E>,
  fn3: (input: T2) => Result<T3, E>,
): Result<T3, E>;
export function railway<TInput, T1, T2, T3, T4, E>(
  input: TInput,
  fn1: (input: TInput) => Result<T1, E>,
  fn2: (input: T1) => Result<T2, E>,
  fn3: (input: T2) => Result<T3, E>,
  fn4: (input: T3) => Result<T4, E>,
): Result<T4, E>;
export function railway<TInput, T1, T2, T3, T4, T5, E>(
  input: TInput,
  fn1: (input: TInput) => Result<T1, E>,
  fn2: (input: T1) => Result<T2, E>,
  fn3: (input: T2) => Result<T3, E>,
  fn4: (input: T3) => Result<T4, E>,
  fn5: (input: T4) => Result<T5, E>,
): Result<T5, E>;
export function railway<TInput, TOutput, E>(
  input: TInput,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...functions: Array<(input: any) => Result<any, E>>
): Result<TOutput, E> {
  return functions.reduce<Result<any, E>>(
    (result, fn) => (result.success ? fn(result.value) : result),
    success(input),
  ) as Result<TOutput, E>;
}

/**
 * Recovers from a failure by applying a function to the error
 * @param fn Function to handle the error and return a new result
 */
export const recover =
  <T, E1, E2>(fn: (error: E1) => Result<T, E2>): ((result: Result<T, E1>) => Result<T, E2>) =>
  (result) =>
    result.success ? result : fn(result.error);

/**
 * Taps into a result chain for side effects without modifying the value
 * @param fn Side effect function to execute on success
 */
export const tap =
  <T, E>(fn: (value: T) => void): ((result: Result<T, E>) => Result<T, E>) =>
  (result) => {
    if (result.success) {
      fn(result.value);
    }
    return result;
  };

/**
 * Checks if a value is a number
 * @param value The value to check
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number';

/**
 * Checks if a value is a string
 * @param value The value to check
 */
export const isString = (value: unknown): value is string => typeof value === 'string';

/**
 * Checks if a value is a function
 * @param value The value to check
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (value: unknown): value is Function => typeof value === 'function';

/**
 * Checks if a value is a promise
 * @param value The value to check
 */
export const isPromise = (value: unknown): value is Promise<unknown> =>
  !!value &&
  (typeof value === 'object' || typeof value === 'function') &&
  typeof (value as Promise<unknown>).then === 'function';
