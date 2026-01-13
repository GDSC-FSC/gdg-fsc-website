import type { Method } from '../types';

/**
 * Creates a bound version of a method.
 * @param originalMethod The method to bind
 * @param context The context to bind to
 * @returns The bound method
 */
export function bindFn<D = unknown, A extends unknown[] = unknown[]>(
  originalMethod: Method<D, A>,
  context: unknown,
): Method<D, A> {
  return originalMethod.bind(context) as Method<D, A>;
}
