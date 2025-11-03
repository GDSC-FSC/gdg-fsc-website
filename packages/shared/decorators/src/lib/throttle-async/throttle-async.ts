import { throttleAsyncFn } from './throttle-async.fn.ts';

export function throttleAsync<T = any, D = any>(parallelCalls?: number): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<AsyncMethod<any>>,
  ): TypedPropertyDescriptor<AsyncMethod<D>> => {
    if (descriptor.value) {
      descriptor.value = throttleAsyncFn(descriptor.value, parallelCalls);

      return descriptor;
    }

    throw new Error('@throttleAsync is applicable only on a methods.');
  };
}