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

import type { Node } from './index.js';

export class Queue<T> {
  private firstItem: Node<T> | null = null;

  private lastItem: Node<T> | null = null;

  // set of all real, non-negative numbers
  // type SetOfAllRealNonNegativeNumbers = ;

  private size = 0;

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public enqueue(item: T): void {
    const newItem = Queue.createItem(item);

    if (this.isEmpty()) {
      this.firstItem = newItem;
      this.lastItem = newItem;
    } else {
      if (this.lastItem) {
        this.lastItem.next = newItem;
      }
      this.lastItem = newItem;
    }

    this.size += 1;
  }

  public dequeue(): T | null {
    let removedItem: T | null = null;

    if (!this.isEmpty() && this.firstItem) {
      removedItem = this.firstItem.value;
      this.firstItem = this.firstItem.next;
      this.size -= 1;
    }

    return removedItem;
  }

  private static createItem<T>(value: T): Node<T> {
    return {
      next: null,
      value,
    };
  }
}
