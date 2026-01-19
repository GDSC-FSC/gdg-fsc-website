/**
 * Copyright (c) 2026 GDG on Campus Farmingdale State College
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Method } from '../types.js';
import { rateLimitFn } from './rate-limit.fn.js';
import type { RateLimitConfigs } from './rate-limit.types.js';

/**
 * Decorator that rate limits method calls.
 * Only allows a specified number of calls within a time globalThis.
 *
 * @param config Rate limit configuration
 * @returns The decorator function
 *
 * @example
 * class Api {
 *   @rateLimit({ timeSpanMs: 1000, allowedCalls: 5 })
 *   fetchData() {
 *     // Only 5 calls allowed per second
 *   }
 * }
 */
export function rateLimit<T = unknown>(
  config: RateLimitConfigs<T>,
): (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<unknown>>,
) => TypedPropertyDescriptor<Method<unknown>> {
  return (
    _target: T,
    _propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<unknown>>,
  ): TypedPropertyDescriptor<Method<unknown>> => {
    if (descriptor.value) {
      descriptor.value = rateLimitFn(descriptor.value, config);
      return descriptor;
    }

    throw new Error('@rateLimit is applicable only on methods.');
  };
}
