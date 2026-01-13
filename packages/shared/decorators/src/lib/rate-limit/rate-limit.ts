import type { Method } from '../types';
import { rateLimitFn } from './rate-limit.fn';
import type { RateLimitConfigs } from './rate-limit.types';

/**
 * Decorator that rate limits method calls.
 * Only allows a specified number of calls within a time window.
 *
 * @param config Rate limit configuration
 * @returns The decorator function
 *
 * @example
 * class Api {
 *   @rateLimit({ timeSpanMs: 1000, allowedCalls: 5 })
 *   fetchData() {
 *     // Only 5 calls allowed per second
 *   }
 * }
 */
export function rateLimit<T = unknown>(
  config: RateLimitConfigs<T>,
): (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<unknown>>,
) => TypedPropertyDescriptor<Method<unknown>> {
  return (
    _target: T,
    _propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<unknown>>,
  ): TypedPropertyDescriptor<Method<unknown>> => {
    if (descriptor.value) {
      descriptor.value = rateLimitFn(descriptor.value, config);
      return descriptor;
    }

    throw new Error('@rateLimit is applicable only on methods.');
  };
}
