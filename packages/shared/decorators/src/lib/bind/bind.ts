import type { Method } from '../types';

/**
 * Decorator that automatically binds a method to its class instance.
 * This ensures `this` always refers to the class instance, even when
 * the method is passed as a callback or stored separately.
 *
 * @example
 * class MyClass {
 *   @bind
 *   handleClick() {
 *     console.log(this); // Always refers to MyClass instance
 *   }
 * }
 */
export function bind<T = unknown>(
  _target: T,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<Method<unknown>>,
): TypedPropertyDescriptor<Method<unknown>> {
  const originalMethod = descriptor.value;

  if (!originalMethod) {
    throw new Error('@bind is applicable only on methods.');
  }

  // Use a getter to lazily bind the method on first access
  return {
    configurable: true,
    enumerable: false,
    get(this: object): Method<unknown> {
      const boundMethod = originalMethod.bind(this);

      // Define the bound method directly on the instance for subsequent accesses
      Object.defineProperty(this, propertyKey, {
        value: boundMethod,
        configurable: true,
        writable: true,
      });

      return boundMethod;
    },
  };
}
