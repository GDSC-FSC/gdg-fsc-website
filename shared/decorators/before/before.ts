import { beforeFn } from './before.fn.ts';
import type { BeforeConfig } from './before.types.ts';

export function before<T = any>(config: BeforeConfig<T>): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<any>> => {
    if (descriptor.value) {
      descriptor.value = beforeFn(descriptor.value, config);

      return descriptor;
    }
    throw new Error('@before is applicable only on a methods.');
  };
}
