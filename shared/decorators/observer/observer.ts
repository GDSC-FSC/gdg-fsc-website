import type { ObserverCallback } from '.'

function factory<T>(cb?: ObserverCallback<T>): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let value: T;
    const { name } = target.constructor;
    Object.defineProperty(target, propertyKey, {
      set(newValue: T) {
        value = newValue;
        if (cb) {
          cb(newValue);
        } else {
          console.log(`setting property ${name}#${String(propertyKey)} = ${newValue}`);
        }
      },
      get() {
        return value;
      },
    });
  };
}

/**
 * Observe all changes of a property. All assignments will be logged to the console.
 */
export function observe(target: object, propertyKey: string | symbol): void;

/**
 * Observe all changes of a property and invoke a provided callback on each assignment.
 * @param cb callback to execute on assignment of observed variable
 */
export function observe<T>(cb: ObserverCallback<T>): PropertyDecorator;

export function observe<T>(
  targetOrCb: object | ObserverCallback<T>,
  propertyKey?: string | symbol,
) {
  if (propertyKey && !isFunction(targetOrCb)) {
    const decorator = factory();
    return decorator(targetOrCb, propertyKey);
  }
  if (isFunction( targetOrCb)) {
    return factory(targetOrCb as ObserverCallback<T>);
  }
  throw new TypeError('@observe not used with correct parameters!');
}
