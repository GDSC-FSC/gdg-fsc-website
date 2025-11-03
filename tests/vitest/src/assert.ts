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

import { Stringify } from '../../../apps/frontend/src/utils';

/**
 * Asserts that two values are deeply equal.
 *
 * This function provides a robust comparison for:
 * - Primitive values (numbers, strings, booleans, null, undefined, symbols, bigints)
 * - Objects (recursively, comparing all enumerable own properties)
 * - Arrays (recursively, comparing elements by index)
 * - Date objects (comparing their time values)
 * - Regular Expression objects (comparing their source and flags)
 *
 * @param expected The expected value.
 * @param actual The actual value.
 * @param message An optional message to include in the error if the assertion fails.
 * @throws {Error} If the expected and actual values are not deeply equal.
 */
export const assertDeepEquals = <T>(expected: T, actual: T, message?: string): void => {
  /**
   * Helper function to perform a deep comparison of two values.
   * @param a The first value.
   * @param b The second value.
   * @returns True if the values are deeply equal, false otherwise.
   */
  const areDeeplyEqual = (a: any, b: any): boolean => {
    if (a === b) {
      return true;
    }

    if (a === null || b === null || typeof a !== typeof b) {
      return false;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    if (a instanceof RegExp && b instanceof RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) {
        return false;
      }
      for (let i = 0; i < a.length; i++) {
        if (!areDeeplyEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (typeof a === 'object' && typeof b === 'object') {
      if (a.constructor !== Object || b.constructor !== Object) {
        return false;
      }

      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) {
        return false;
      }

      for (const key of keysA) {
        if (!Object.hasOwn(b, key) || !areDeeplyEqual(a[key], b[key])) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  if (!areDeeplyEqual(expected, actual)) {
    const defaultMessage = `Assertion failed: Expected ${Stringify({ expected })} but got ${Stringify({ actual })}.`;

    throw new Error(message ? `${message}: ${defaultMessage}` : defaultMessage);
  }
};
