import type { Method } from '../types';

export function delayFn<D = unknown, A extends unknown[] = unknown[]>(
  originalMethod: Method<D, A>,
  delayMs: number,
): Method<void, A> {
  return function (this: unknown, ...args: A): void {
    setTimeout(() => {
      originalMethod.apply(this, args);
    }, delayMs);
  };
}
