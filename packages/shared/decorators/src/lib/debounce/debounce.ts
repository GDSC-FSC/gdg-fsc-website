import { debounceFn } from './debounce.fn.ts';

export function debounce<T = any>(delayMs: number): Decorator<T> {
  return (
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<Method<any>>,
  ): TypedPropertyDescriptor<Method<any>> => {
    if (descriptor.value) {
      const methodsMap = new WeakMap<any, Method<any>>();
      const originalMethod = descriptor.value;

      descriptor.value = function (...args: any[]) {
        if (!methodsMap.has(this)) {
          methodsMap.set(this, debounceFn(originalMethod, delayMs).bind(this));
        }

        methodsMap.get(this)(...args);
      };

      return descriptor;
    }

    throw new Error('@debounce is applicable only on a methods.');
  };
}
