import type { Decorator, Method } from '../types';
import { delayFn } from './delay.fn.ts';

export function delay<T = unknown>(delayMs: number): Decorator<T> {
  return (
    _target: T,
    _propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<unknown>>,
  ): TypedPropertyDescriptor<Method<unknown>> => {
    if (descriptor.value) {
      descriptor.value = delayFn(descriptor.value, delayMs);

      return descriptor;
    }
    throw new Error('@delay is applicable only on a methods.');
  };
}
