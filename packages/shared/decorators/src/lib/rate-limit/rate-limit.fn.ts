import type { Method } from '../types';
import type { RateLimitConfigs, RateLimitCounter } from './rate-limit.types';
import { SimpleRateLimitCounter } from './simple-rate-limit-counter';

/**
 * Creates a rate-limited version of a method.
 * @param originalMethod The method to rate limit
 * @param config The rate limit configuration
 * @returns A rate-limited method
 */
export function rateLimitFn<D = unknown, A extends unknown[] = unknown[]>(
  originalMethod: Method<D, A>,
  config: RateLimitConfigs,
): Method<D | undefined, A> {
  const counter: RateLimitCounter = config.rateLimitCounter ?? new SimpleRateLimitCounter();

  return function (this: unknown, ...args: A): D | undefined {
    const key =
      typeof config.keyResolver === 'function'
        ? config.keyResolver(...args)
        : 'default';

    const currentCount = counter.getCount(key);

    if (currentCount >= config.allowedCalls) {
      config.exceedHandler?.();
      return undefined;
    }

    counter.inc(key);

    // Schedule decrement after time span
    setTimeout(() => {
      counter.dec(key);
    }, config.timeSpanMs);

    return originalMethod.apply(this, args);
  };
}
