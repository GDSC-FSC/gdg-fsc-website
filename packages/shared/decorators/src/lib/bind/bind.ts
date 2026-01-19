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

import type { Method } from '../types.js';

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
