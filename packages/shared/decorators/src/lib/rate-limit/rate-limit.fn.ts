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
import type { RateLimitConfigs, RateLimitCounter } from './rate-limit.types.js';
import { SimpleRateLimitCounter } from './simple-rate-limit-counter.js';

/**
 * Creates a rate-limited version of a method.
 * @param originalMethod The method to rate limit
 * @param config The rate limit configuration
 * @returns A rate-limited method
 */
export function rateLimitFn<D = unknown, A extends unknown[] = unknown[]>(
  originalMethod: Method<D, A>,
  config: RateLimitConfigs,
): Method<D | undefined, A> {
  const counter: RateLimitCounter = config.rateLimitCounter ?? new SimpleRateLimitCounter();

  return function (this: unknown, ...args: A): D | undefined {
    const key = typeof config.keyResolver === 'function' ? config.keyResolver(...args) : 'default';

    const currentCount = counter.getCount(key);

    if (currentCount >= config.allowedCalls) {
      config.exceedHandler?.();
      return undefined;
    }

    counter.inc(key);

    // Schedule decrement after time span
    setTimeout(() => {
      counter.dec(key);
    }, config.timeSpanMs);

    return originalMethod.apply(this, args);
  };
}
