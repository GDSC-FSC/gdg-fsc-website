import { ThrottleAsyncExecutor } from './throttle-async-executor';

export function throttleAsyncFn<D = any, A extends any[] = any[]>(originalMethod: AsyncMethod<D, A>, parallelCalls = 1): AsyncMethod<D, A> {
  const executor = new ThrottleAsyncExecutor(originalMethod, parallelCalls);

  return function (...args: A): Promise<D> {
    return executor.exec(this, args);
  };
}