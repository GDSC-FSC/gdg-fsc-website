import type { Node } from '.';

export class Queue<T> {
  private firstItem: Node<T> = null;

  private lastItem: Node<T> = null;

  // set of all real, non-negative numbers
  // type SetOfAllRealNonNegativeNumbers = ;

  private size: number = 0;

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
      this.lastItem.next = newItem;
      this.lastItem = newItem;
    }

    this.size += 1;
  }

  public dequeue(): T {
    let removedItem = null;

    if (!this.isEmpty()) {
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