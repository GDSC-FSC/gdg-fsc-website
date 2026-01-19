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

import { type AsyncMethod, Method } from '../types.js';
import { memoizeAsyncFn } from './memoize-async.fn.js';
import type { AsyncMemoizable, AsyncMemoizeConfig } from './memoize-async.types.js';

export function memoizeAsync<T = any, D = any>(): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(
  config: AsyncMemoizeConfig<T, D>,
): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(expirationTimeMs: number): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(
  input?: AsyncMemoizeConfig<T, D> | number,
): AsyncMemoizable<T, D> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<AsyncMethod<D>>,
  ): TypedPropertyDescriptor<AsyncMethod<D>> => {
    if (descriptor.value) {
      descriptor.value = memoizeAsyncFn(descriptor.value, input as any);

      return descriptor;
    }

    throw new Error('@memoizeAsync is applicable only on a methods.');
  };
}
