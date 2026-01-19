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
import type { AfterConfig, AfterFunc } from './after.types.js';

export function afterFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  config: AfterConfig<any, ReturnType<typeof originalMethod>>,
): (...args: any[]) => Promise<D> {
  const resolvedConfig: AfterConfig<any, ReturnType<typeof originalMethod>> = {
    wait: false,
    ...config,
  };

  return async function (this: any, ...args: A): Promise<D> {
    const afterFunc: AfterFunc<ReturnType<typeof originalMethod>> =
      typeof resolvedConfig.func === 'string'
        ? this[resolvedConfig.func].bind(this)
        : resolvedConfig.func;

    if (resolvedConfig.wait) {
      const response = await originalMethod.apply(this, args);
      afterFunc({
        args,
        response,
      });
      return response;
    }

    const response = originalMethod.apply(this, args);
    afterFunc({
      args,
      response,
    });
    return response;
  };
}
