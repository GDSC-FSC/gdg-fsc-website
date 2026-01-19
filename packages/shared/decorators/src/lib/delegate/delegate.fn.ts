import type { AsyncMethod } from '../types.js';
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

export function delegateFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
  keyResolver?: (...args: A) => string,
): AsyncMethod<D, A> {
  const delegatedKeysMap = new Map<string, Promise<any>>();
  const keyGenerator: (...args: any[]) => string =
    keyResolver ?? ((...args) => JSON.stringify(args));

  return function (this: any, ...args: A): Promise<D> {
    const key = keyGenerator(...args);

    if (!delegatedKeysMap.has(key)) {
      delegatedKeysMap.set(
        key,
        originalMethod.apply(this, args).finally(() => delegatedKeysMap.delete(key)),
      );
    }

    return delegatedKeysMap.get(key) as Promise<D>;
  };
}
