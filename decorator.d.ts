type Method<D, A extends Array<any> = any[]> = (...args: A) => D;
type AsyncMethod<D, A extends Array<any> = any[]> = (...args: A) => Promise<D>;
type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

type Decorator<T> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<any>>,
) => TypedPropertyDescriptor<Method<any>>;
