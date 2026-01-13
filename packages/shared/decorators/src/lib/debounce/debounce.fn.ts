import type { Method } from '../types';

export function debounceFn<D = unknown, A extends unknown[] = unknown[]>(
  originalMethod: Method<D, A>,
  delayMs: number,
): Method<void, A> {
  let handler: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: A): void {
    clearTimeout(handler);

    handler = setTimeout(() => {
      originalMethod.apply(this, args);
    }, delayMs);
  };
}
