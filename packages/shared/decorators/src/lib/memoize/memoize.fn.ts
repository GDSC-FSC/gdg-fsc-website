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

import { TaskExec } from '../../../../utils/src/index.js';
import type { Method } from '../types.js';
import type { MemoizeConfig } from './memoize.types.js';

export function memoizeFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
): Method<D, A>;
export function memoizeFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  config: MemoizeConfig<any, D>,
): Method<D, A>;
export function memoizeFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  expirationTimeMs: number,
): Method<D, A>;
export function memoizeFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  input?: MemoizeConfig<any, D> | number,
): Method<D, A> {
  const defaultConfig: MemoizeConfig<any, D> = {
    cache: new Map<string, D>(),
  };

  const runner = new TaskExec();
  let resolvedConfig = {
    ...defaultConfig,
  } as MemoizeConfig<any, D>;

  if (typeof input === 'number') {
    resolvedConfig.expirationTimeMs = input;
  } else {
    resolvedConfig = {
      ...resolvedConfig,
      ...input,
    };
  }

  return function (this: any, ...args: A): D {
    const keyResolver =
      typeof resolvedConfig.keyResolver === 'string'
        ? this[resolvedConfig.keyResolver].bind(this)
        : resolvedConfig.keyResolver;

    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);

    if (resolvedConfig.cache && !resolvedConfig.cache.has(key)) {
      const response = originalMethod.apply(this, args);

      if (resolvedConfig.expirationTimeMs !== undefined) {
        runner.exec(() => {
          resolvedConfig.cache?.delete(key);
        }, resolvedConfig.expirationTimeMs);
      }

      resolvedConfig.cache.set(key, response);
    }

    return resolvedConfig.cache?.get(key) as D;
  };
}
