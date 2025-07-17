export function debounceFn<D = any, A extends any[] = any[]>(
  originalMethod: Method<D, A>,
  delayMs: number,
): Method<void, A> {
  let handler: any;

  return function (...args: A): void {
    clearTimeout(handler);

    handler = setTimeout(() => {
      originalMethod.apply(this, args);
    }, delayMs);
  };
}
