/**
 * Copyright (c) 2026 GDG on Campus Farmingdale State College
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { isFunction } from '../../../../utils/src/index.js';
import type { ObserverCallback } from './index.js';

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
  if (isFunction(targetOrCb)) {
    return factory(targetOrCb as ObserverCallback<T>);
  }
  throw new TypeError('@observe not used with correct parameters!');
}
