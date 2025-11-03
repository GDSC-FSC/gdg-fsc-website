import { throttleFn } from './throttle.fn.ts';

export function throttle<T = any>(delayMs: number): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<any>> => {
    if (descriptor.value) {
      descriptor.value = throttleFn(descriptor.value, delayMs);

      return descriptor;
    }

    throw new Error('@throttle is applicable only on a methods.');
  };
}