import type { AfterConfig, AfterFunc } from './after.types.ts';

export function afterFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  config: AfterConfig<any, ReturnType<typeof originalMethod>>,
): (...args: any[]) => void {
  const resolvedConfig: AfterConfig<any, ReturnType<typeof originalMethod>> = {
    wait: false,
    ...config,
  };

  return async function (...args: A): Promise<D> {
    const afterFunc: AfterFunc<ReturnType<typeof originalMethod>> =
      typeof resolvedConfig.func === 'string'
        ? this[resolvedConfig.func].bind(this)
        : resolvedConfig.func;

    if (resolvedConfig.wait) {
      const response = await originalMethod.apply(this, args);
      afterFunc({
        args,
        response,
      });
      return response;
    }

    const response = originalMethod.apply(this, args);
    afterFunc({
      args,
      response,
    });
    return response;
  };
}
