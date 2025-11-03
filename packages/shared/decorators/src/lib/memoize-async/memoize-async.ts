import { memoizeAsyncFn } from './memoize-async.fn.ts';
import type { AsyncMemoizable, AsyncMemoizeConfig } from './memoize-async.types.ts';

export function memoizeAsync<T = any, D = any>(): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(
  config: AsyncMemoizeConfig<T, D>,
): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(expirationTimeMs: number): AsyncMemoizable<T, D>;
export function memoizeAsync<T = any, D = any>(
  input?: AsyncMemoizeConfig<T, D> | number,
): AsyncMemoizable<T, D> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<AsyncMethod<D>>,
  ): TypedPropertyDescriptor<AsyncMethod<D>> => {
    if (descriptor.value) {
      descriptor.value = memoizeAsyncFn(descriptor.value, input as any);

      return descriptor;
    }

    throw new Error('@memoizeAsync is applicable only on a methods.');
  };
}
