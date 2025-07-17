import { delegateFn } from './delegate.fn.ts';
import type { Delegatable } from './delegate.types.ts';

export function delegate<T = any, D = any>(
  keyResolver?: (...args: any[]) => string,
): Delegatable<T, D> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<AsyncMethod<D>>,
  ): TypedPropertyDescriptor<AsyncMethod<any>> => {
    if (descriptor.value) {
      descriptor.value = delegateFn(descriptor.value, keyResolver);

      return descriptor;
    }

    throw new Error('@delegate is applicable only on a methods.');
  };
}
