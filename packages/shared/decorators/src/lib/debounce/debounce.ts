import type { Decorator, Method } from '../types';
import { debounceFn } from './debounce.fn.ts';

export function debounce<T = unknown>(delayMs: number): Decorator<T> {
  return (
    _target: T,
    _propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<unknown>>,
  ): TypedPropertyDescriptor<Method<unknown>> => {
    if (descriptor.value) {
      const methodsMap = new WeakMap<object, Method<unknown>>();
      const originalMethod = descriptor.value;

      descriptor.value = function (this: object, ...args: unknown[]) {
        if (!methodsMap.has(this)) {
          methodsMap.set(this, debounceFn(originalMethod, delayMs).bind(this));
        }

        const method = methodsMap.get(this);
        if (method) {
          method(...args);
        }
      };

      return descriptor;
    }

    throw new Error('@debounce is applicable only on a methods.');
  };
}
