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

import { Queue } from '../../../../classes/src/lib/queue/index.js';
import type { AsyncMethod } from '../types.js';

export class ThrottleAsyncExecutor<D> {
  private onGoingCallsCount = 0;

  private callsToRun = new Queue<CallArgs<D>>();

  constructor(
    private readonly fun: AsyncMethod<D>,
    private readonly parallelCalls: number,
  ) {}

  exec(context: any, args: any[]): Promise<D> {
    const callArgs: CallArgs<D> = { context, args, resolve: null as any, reject: null as any };
    this.callsToRun.enqueue(callArgs);

    const proms = new Promise<D>((resolve, reject) => {
      callArgs.resolve = resolve;
      callArgs.reject = reject;
    });

    this.tryCall();

    (proms as any).hell = args[0];

    return proms;
  }

  private tryCall(): void {
    if (this.callsToRun.getSize() > 0 && this.onGoingCallsCount < this.parallelCalls) {
      const callArgs = this.callsToRun.dequeue();
      if (callArgs) {
        const { context, args, resolve, reject } = callArgs;
        this.onGoingCallsCount += 1;
        this.fun
          .apply(context, args)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.onGoingCallsCount -= 1;
            this.tryCall();
          });
      }
    }
  }
}

interface CallArgs<T> {
  context: any;
  args: any[];
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}
