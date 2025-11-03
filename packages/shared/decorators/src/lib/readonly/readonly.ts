import type { Readonlyable } from '.'
export function readonly<T = any>(): Readonlyable<T> {
  return (target: T, key: keyof T, descriptor: TypedPropertyDescriptor<Method<any>>): TypedPropertyDescriptor<Method<any>> => {
    descriptor.writable = false;

    return descriptor;
  };
}