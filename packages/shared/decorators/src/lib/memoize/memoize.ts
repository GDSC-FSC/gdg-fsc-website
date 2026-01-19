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
import { memoizeFn } from './memoize.fn.js';
import type { Memoizable, MemoizeConfig } from './memoize.types.js';

export function memoize<T = any, D = any>(): Memoizable<T, D>;
export function memoize<T = any, D = any>(config: MemoizeConfig<T, D>): Memoizable<T, D>;
export function memoize<T = any, D = any>(expirationTimeMs: number): Memoizable<T, D>;
export function memoize<T = any, D = any>(input?: MemoizeConfig<T, D> | number): Memoizable<T, D> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<D>>,
  ): TypedPropertyDescriptor<Method<D>> => {
    if (descriptor.value) {
      descriptor.value = memoizeFn(descriptor.value, input as any);

      return descriptor;
    }
    throw new Error('@memoize is applicable only on a methods.');
  };
}
