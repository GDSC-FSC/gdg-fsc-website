import { afterFn } from './after.fn.ts';
import type { AfterConfig } from './after.types.ts';

export function after<T = any, D = any>(config: AfterConfig<T, D>): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<D>> => {
    if (descriptor.value) {
      descriptor.value = afterFn(descriptor.value, config);

      return descriptor;
    }
    throw new Error('@after is applicable only on a methods.');
  };
}
