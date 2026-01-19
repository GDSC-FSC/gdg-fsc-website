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

import type { RateLimitCounter } from './index.js';

export class SimpleRateLimitCounter implements RateLimitCounter {
  constructor(private readonly counterMap = new Map<string, number>()) {}

  getCount(key: string): number {
    return this.counterMap.get(key) ?? 0;
  }

  inc(key: string): void {
    if (!this.counterMap.has(key)) {
      this.counterMap.set(key, 0);
    }

    this.counterMap.set(key, (this.counterMap.get(key) ?? 0) + 1);
  }

  dec(key: string): void {
    const currentCount = this.counterMap.get(key);

    if (currentCount !== undefined) {
      if (currentCount <= 1) {
        this.counterMap.delete(key);
      } else {
        this.counterMap.set(key, currentCount - 1);
      }
    }
  }
}
