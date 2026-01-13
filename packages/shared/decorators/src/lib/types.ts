/**
 * A generic method type used throughout decorators.
 * @template D The return type of the method
 * @template A The argument types of the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Method<D = unknown, A extends unknown[] = unknown[]> = (...args: A) => D;

/**
 * A generic decorator type for method decorators.
 * @template T The class type containing the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator<T = unknown> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<unknown>>,
) => TypedPropertyDescriptor<Method<unknown>>;

/**
 * A generic async method type.
 * @template D The resolved type of the Promise
 * @template A The argument types of the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncMethod<D = unknown, A extends unknown[] = unknown[]> = (...args: A) => Promise<D>;

/**
 * A decorator type specifically for async methods.
 * @template T The class type containing the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncDecorator<T = unknown> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<AsyncMethod<unknown>>,
) => TypedPropertyDescriptor<AsyncMethod<unknown>>;
