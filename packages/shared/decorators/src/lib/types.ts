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

/**
 * A generic method type used throughout decorators.
 * @template D The return type of the method
 * @template A The argument types of the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Method<D = any, A extends any[] = any[]> = (...args: A) => D;

/**
 * A generic decorator type for method decorators.
 * @template T The class type containing the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Decorator<T = any> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<Method<any>>,
) => TypedPropertyDescriptor<Method<any>>;

/**
 * A generic async method type.
 * @template D The resolved type of the Promise
 * @template A The argument types of the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncMethod<D = any, A extends any[] = any[]> = (...args: A) => Promise<D>;

/**
 * A decorator type specifically for async methods.
 * @template T The class type containing the method
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncDecorator<T = any> = (
  target: T,
  propertyName: keyof T,
  descriptor: TypedPropertyDescriptor<AsyncMethod<any>>,
) => TypedPropertyDescriptor<AsyncMethod<any>>;
