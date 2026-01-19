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

import { isPromise } from '../../../../utils/src/index.js';
import { logger } from '../../../../utils/src/lib/logger.js';
import type { AsyncMethod, Method } from '../types.js';
import type { ExactTimeReportData, ReportFunction } from './exec-time.types.js';

const reporter: ReportFunction = (data: ExactTimeReportData): void => {
  logger.info(`Execution time: ${data.execTime}ms`);
};

export function execTimeFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A> | AsyncMethod<D, A>,
  arg?: ReportFunction | string,
): AsyncMethod<void, A> {
  const input: ReportFunction | string = arg ?? reporter;

  return async function (this: any, ...args: A): Promise<void> {
    let repFunc: ReportFunction;

    if (typeof input === 'string') {
      if (typeof this[input] === 'function') {
        repFunc = this[input].bind(this);
      } else {
        repFunc = (data) => {
          logger.info(`${input} execution time`, { duration: `${data.execTime}ms` });
        };
      }
    } else {
      repFunc = input;
    }

    const start = Date.now();
    let result = (originalMethod as any).apply(this, args);

    if (isPromise(result)) {
      result = await result;
    }

    repFunc({
      args,
      result,
      execTime: Date.now() - start,
    });
  };
}
