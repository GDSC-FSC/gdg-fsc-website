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

import type { Decorator, Method } from '../types.js';
import { debounceFn } from './debounce.fn.js';

export function debounce<T = unknown>(delayMs: number): Decorator<T> {
  return (
    _target: T,
    _propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<unknown>>,
  ): TypedPropertyDescriptor<Method<unknown>> => {
    if (descriptor.value) {
      const methodsMap = new WeakMap<object, Method<unknown>>();
      const originalMethod = descriptor.value;

      descriptor.value = function (this: object, ...args: unknown[]) {
        if (!methodsMap.has(this)) {
          methodsMap.set(this, debounceFn(originalMethod, delayMs).bind(this));
        }

        const method = methodsMap.get(this);
        if (method) {
          method(...args);
        }
      };

      return descriptor;
    }

    throw new Error('@debounce is applicable only on a methods.');
  };
}
