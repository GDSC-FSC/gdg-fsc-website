import { delayFn } from './delay.fn.ts';

export function delay<T = any>(delayMs: number): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<any>> => {
    if (descriptor.value) {
      descriptor.value = delayFn(descriptor.value, delayMs);

      return descriptor;
    }
    throw new Error('@delay is applicable only on a methods.');
  };
}
