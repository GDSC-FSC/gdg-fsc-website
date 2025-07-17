import { memoizeFn } from './memoize.fn.ts';
import type { Memoizable, MemoizeConfig } from './memoize.types.ts';

export function memoize<T = any, D = any>(): Memoizable<T, D>;
export function memoize<T = any, D = any>(config: MemoizeConfig<T, D>): Memoizable<T, D>;
export function memoize<T = any, D = any>(expirationTimeMs: number): Memoizable<T, D>;
export function memoize<T = any, D = any>(input?: MemoizeConfig<T, D> | number): Memoizable<T, D> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<D>>,
  ): TypedPropertyDescriptor<Method<D>> => {
    if (descriptor.value) {
      descriptor.value = memoizeFn(descriptor.value, input as any);

      return descriptor;
    }
    throw new Error('@memoize is applicable only on a methods.');
  };
}
