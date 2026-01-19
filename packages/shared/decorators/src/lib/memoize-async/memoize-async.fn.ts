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

import { isNumber, isString, TaskExec } from '../../../../utils/src/index.js';
import type { AsyncMethod } from '../types.js';
import type { AsyncMemoizeConfig } from './memoize-async.types.js';

export function memoizeAsyncFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
): AsyncMethod<D, A>;
export function memoizeAsyncFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
  config: AsyncMemoizeConfig<any, D>,
): AsyncMethod<D, A>;
export function memoizeAsyncFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
  expirationTimeMs: number,
): AsyncMethod<D, A>;

export function memoizeAsyncFn<D = any, A extends any[] = any[]>(
  originalMethod: AsyncMethod<D, A>,
  input?: AsyncMemoizeConfig<any, D> | number,
): AsyncMethod<D, A> {
  const defaultConfig: AsyncMemoizeConfig<any, D> = {
    cache: new Map<string, D>(),
  };
  const runner = new TaskExec();
  const promCache = new Map<string, Promise<D>>();
  let resolvedConfig = {
    ...defaultConfig,
  } as AsyncMemoizeConfig<any, D>;

  if (isNumber(input)) {
    resolvedConfig.expirationTimeMs = input;
  } else {
    resolvedConfig = {
      ...resolvedConfig,
      ...input,
    };
  }

  return async function (this: any, ...args: A): Promise<D> {
    const keyResolver = isString(resolvedConfig.keyResolver)
      ? this[resolvedConfig.keyResolver].bind(this)
      : resolvedConfig.keyResolver;

    let key;

    if (keyResolver) {
      key = keyResolver(...args);
    } else {
      key = JSON.stringify(args);
    }

    if (promCache.has(key)) {
      return promCache.get(key) as Promise<D>;
    }

    const prom = (async (): Promise<D> => {
      const inCache = (await resolvedConfig.cache?.has(key)) ?? false;

      if (inCache) {
        return (await resolvedConfig.cache?.get(key)) as D;
      }

      const data = await originalMethod.apply(this, args);
      await resolvedConfig.cache?.set(key, data);

      if (resolvedConfig.expirationTimeMs !== undefined) {
        runner.exec(() => {
          resolvedConfig.cache?.delete(key);
        }, resolvedConfig.expirationTimeMs);
      }

      return data;
    })().finally(() => {
      promCache.delete(key);
    });

    promCache.set(key, prom);

    return prom;
  };
}
