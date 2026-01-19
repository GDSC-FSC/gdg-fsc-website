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

import TinyQueue from 'tinyqueue';
import type { TimedTask } from './task-exec.types.js';

export class TaskExec {
  private tasks = new TinyQueue<TimedTask>([], (a, b) => a.execTime - b.execTime);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handler: any;

  exec(func: (...args: any) => any, ttl: number): void {
    this.tasks.push({ func, execTime: Date.now() + ttl });
    this.handleNext();
  }

  private handleNext(): void {
    if (!this.tasks.length) {
      return;
    }

    const { execTime } = this.tasks.peek()!;
    this.execNext(Math.max(execTime - Date.now(), 0));
  }

  private execNext(ttl: number): void {
    clearTimeout(this.handler);
    this.handler = setTimeout(() => {
      const { func } = this.tasks.pop()!;
      func();
      this.handleNext();
    }, ttl);
  }
}
